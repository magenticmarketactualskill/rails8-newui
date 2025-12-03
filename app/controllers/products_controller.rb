# frozen_string_literal: true

class ProductsController < ApplicationController
  def index
    @products = Product.order(id: :asc).as_json(only: [:id, :sku, :name, :price, :category, :active])
    render inertia: true
  end

  def show
    @product = Product.find(params[:id]).as_json(only: [:id, :sku, :name, :price, :category, :active])
    render inertia: true
  end
end
