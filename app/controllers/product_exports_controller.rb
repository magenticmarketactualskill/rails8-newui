# frozen_string_literal: true

class ProductExportsController < ApplicationController
  def index
    @product_exports = ProductExport.order(product_id: :asc).as_json(only: [:product_id, :sku, :name, :price_cents, :category_slug, :exported_at])
    render inertia: true
  end

  def purge
    count = ProductExport.count
    ProductExport.delete_all
    redirect_to product_exports_path, notice: "Purged #{count} product export(s)"
  end
end
