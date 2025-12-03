class InertiaComponentGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('templates', __dir__)

  argument :actions, type: :array, default: [], banner: "action action"

  def create_component_files
    actions.each do |action|
      @action = action
      template "component.tsx.tt", "app/frontend/pages/#{class_name}/#{action.camelize}.tsx"
    end
  end

  private

  def component_name
    "#{class_name}#{@action.camelize}"
  end
end
