ActiveSupport.escape_html_entities_in_json = false
class SiteController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :verify_github_payload, only: :deploy
  after_action :render_response_to_file, only: :index

  def index
    # Gather each markdown file
    definition_files = Dir[Rails.root.join('definitions','*.md')]

    # Render each markdown file
    @definitions = []
    definition_files.sort.each do |file|
      contents = File.open(file).read
      @definitions << { title: file.split('/',-1).last.split('.').first.titleize,
                        body: convert_to_html(contents),
                        text: contents.gsub(/\[|\(|\#|\*|\]|\)/,'')}
    end
    @number_of_definitions = definition_files.size
    @last_updated_at = File.mtime(definition_files.max_by {|f| File.mtime(f)})
  end

  def sitemap
    definition_files = Dir[Rails.root.join('definitions','*.md')]
    url = 'https://deepjargon.com/'
    links = definition_files.collect{|d| url + d.split('/').last.split('.')[0].gsub('_','-')}
    links << url
    text = links.join("\n")
    render plain: text
    File.open(File.join(Rails.root,'public/sitemap.txt'), "wb+") { |f| f.write(text) } unless Rails.env.development?
  end

  def deploy
    Rails.logger.warn('deploying!')
    `git fetch`
    if `git diff origin/master Gemfile.lock` > ""
      Rails.logger.warn("bundle changed, bundle installing")
      `git reset --hard origin/master; bundle install --deployment`
    else
      `git reset --hard origin/master`
    end
    FileUtils.touch("#{Rails.root}/tmp/restart.txt")
    sleep(1)
    FileUtils.rm_f("#{Rails.root}/public/index.html")
    FileUtils.rm_f("#{Rails.root}/public/sitemap.txt")
  end

  protected

  def gather_definitions

  end

  def verify_github_payload
    request.body.rewind
    payload_body = request.body.read
    signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), GITHUB_WEBHOOK_SECRET, payload_body)
    return halt 500, "Signatures didn't match!" unless Rack::Utils.secure_compare(signature, request.env['HTTP_X_HUB_SIGNATURE'])
  end

  def render_response_to_file
    unless Rails.env.development? or params[:cache] == false
      # This is the Vue SPA we are writing
      File.open(File.join(Rails.root,'public/index.html'), "wb+") { |f| f.write(response.body) }
    end
  end

  def convert_to_html(markdown)
    Kramdown::Document.new(markdown, input: 'GFM',
      syntax_highlighter: 'rouge',
      syntax_highlighter_opts:{default_lang: 'python'},
      math_engine: 'katex').to_html
  end

end