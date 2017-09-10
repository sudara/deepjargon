require 'kramdown'
require 'katex'

module Kramdown::Converter::MathEngine
  module Katex
    def self.call(converter, el, opts)
      type = el.options[:category]
      result = ::Katex.render el.value.strip

      attr = el.attr.dup
      attr.delete('xmlns')
      attr.delete('display')


      result.insert("<math".length, converter.html_attributes(attr))

      (type == :block ? "#{' '*opts[:indent]}#{result}\n" : result)
    end
  end
end

Kramdown::Converter.add_math_engine(:katex, Kramdown::Converter::MathEngine::Katex)

class MarkdownTemplateHandler
  def self.call(template)
    Kramdown::Document.new(markdown, input: 'GFM', math_engine: 'katex').to_html
  end
end

ActionView::Template.register_template_handler(:md, MarkdownTemplateHandler)
