class InertiaScaffoldGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('inertia_scaffold/templates', __dir__)

  argument :attributes, type: :array, default: [], banner: "field:type field:type"

  class_option :skip_routes, type: :boolean, default: false, desc: "Don't add routes"

  def create_controller
    template "controller.rb.tt", "app/controllers/#{file_name.pluralize}_controller.rb"
  end

  def create_components
    %w[Index Show New Edit].each do |action|
      @action = action
      template "#{action.downcase}.tsx.tt", "app/frontend/pages/#{class_name.pluralize}/#{action}.tsx"
    end
  end

  def add_routes
    return if options[:skip_routes]
    route "resources :#{file_name.pluralize}"
  end

  private

  def attributes_list
    attributes.map { |attr| "#{attr.name}: #{attr.type}" }.join(', ')
  end

  def form_fields
    attributes.reject { |attr| attr.name == 'id' }
  end
end
