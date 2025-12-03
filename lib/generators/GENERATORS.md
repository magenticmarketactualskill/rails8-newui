# Custom Rails Generators for Inertia + React

This app includes custom generators configured for the Inertia.js + React + TypeScript stack.

## Configuration

The generators are configured in `config/application.rb` to:
- Skip traditional Rails views (we use Inertia/React instead)
- Skip helpers and assets
- Use Inertia-friendly controller templates

## Available Generators

### 1. Standard Rails Scaffold (Modified)

```bash
rails generate scaffold Post title:string body:text published:boolean
```

This generates:
- Controller with Inertia `render inertia: true` calls
- Uses `use_inertia_instance_props` pattern (inherited from ApplicationController)
- No ERB views (you'll need to create React components manually)

### 2. Inertia Scaffold (Full Stack)

```bash
rails generate inertia_scaffold Post title:string body:text published:boolean
```

This generates:
- Controller with Inertia conventions
- React/TypeScript components for Index, Show, New, Edit
- Routes (use `--skip-routes` to skip)
- Components use shadcn/ui components (Table, Card, Button, etc.)

### 3. Inertia Component Only

```bash
rails generate inertia_component Post index show new edit
```

This generates only the React/TypeScript components without the controller.

## Examples

### Create a complete resource:

```bash
# Generate model
rails generate model Article title:string content:text published:boolean author:string

# Run migration
rails db:migrate

# Generate controller + React components
rails generate inertia_scaffold Article title:string content:text published:boolean author:string
```

### Create just components for existing controller:

```bash
rails generate inertia_component Dashboard index stats
```

## Component Structure

Generated components follow this structure:
- Located in `app/frontend/pages/[ResourceName]/[Action].tsx`
- Use MainLayout wrapper
- Include Inertia Head component for page titles
- Use shadcn/ui components for consistent styling
- TypeScript interfaces for props

## Controller Conventions

Generated controllers:
- Inherit from ApplicationController (which has `use_inertia_instance_props`)
- Use instance variables (e.g., `@posts`) which auto-convert to props
- Call `render inertia: true` (component name inferred from controller/action)
- Follow RESTful conventions

## Customization

To customize templates, edit files in:
- `lib/templates/rails/scaffold_controller/` - for standard scaffold
- `lib/generators/inertia_scaffold/templates/` - for Inertia scaffold
- `lib/generators/templates/` - for component-only generator
