ActiveSupport.escape_html_entities_in_json = false
class SiteController < ApplicationController
  after_action :render_response_to_file, only: :index

  def index
    # Gather each markdown file
    definition_files = Dir[Rails.root.join('definitions','*.md')]

    # Render each markdown file
    @definitions = []
    definition_files.sort.each do |file|
      @definitions << { title: file.split('/',-1).last.split('.').first.titleize,
        body: convert_to_html(File.open(file).read) }
    end
    # Convert to json

    # Cache json

    # Render

  end

  protected

  def render_response_to_file
    File.open(File.join(Rails.root,'public/index.html'), "wb+") { |f| f.write(response.body) } unless Rails.env.development?
  end

  def convert_to_html(markdown)
    Kramdown::Document.new(markdown, input: 'GFM', math_engine: 'katex').to_html
  end

end