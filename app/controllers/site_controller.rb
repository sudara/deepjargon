ActiveSupport.escape_html_entities_in_json = false
class SiteController < ApplicationController
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
                        text: contents.gsub(/\[\(\#/,'')}
    end
    @number_of_definitions = definition_files.size
    @last_updated_at = File.mtime(definition_files.max_by {|f| File.mtime(f)})
  end

  def deploy
    Rails.logger.warn('deploying!')
    if `git diff origin/master Gemfile.lock` > ""
      Rails.logger.warn("bundle changed, bundle installing")
      `git reset --hard origin/master; bundle install --deployment`
    else
      `git reset --hard origin/master`
    end
    FileUtils.touch("#{Rails.root}/tmp/restart.txt")
    sleep(1)
    FileUtils.rm_f("#{Rails.root}/public/index.html")
  end

  protected

  def verify_github_payload
    request.body.rewind
    payload_body = request.body.read
    signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), GITHUB_WEBHOOK_SECRET, payload_body)
    return halt 500, "Signatures didn't match!" unless Rack::Utils.secure_compare(signature, request.env['HTTP_X_HUB_SIGNATURE'])
  end

  def render_response_to_file
    File.open(File.join(Rails.root,'public/index.html'), "wb+") { |f| f.write(response.body) } unless Rails.env.development?
  end

  def convert_to_html(markdown)
    Kramdown::Document.new(markdown, input: 'GFM',
      syntax_highlighter: 'rouge',
      syntax_highlighter_opts:{default_lang: 'python'},
      math_engine: 'katex').to_html
  end

end