require 'kramdown'
ActiveSupport.escape_html_entities_in_json = false
class SiteController < ApplicationController


  def index
    # Gather each markdown file
    definition_files = Dir[Rails.root.join('app','views','definitions','*.md')]

    # Render each markdown file
    @definitions = []
    definition_files.each do |file|
      @definitions << { title: file.split('/',-1).last.split('.').first.titleize,
        body: convert_to_html(File.open(file).read) }
    end
    # Convert to json

    # Cache json

    # Render

  end

  protected

  def convert_to_html(markdown)
    Kramdown::Document.new(markdown, input: 'GFM').to_html
  end

end