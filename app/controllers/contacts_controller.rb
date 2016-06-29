class ContactsController < ApplicationController
  def index
    @contacts = Contact.all
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      render json: @contact.as_json
    else
      render json: {message: "Not created successfully"}.to_json
    end
  end

  def destroy
    contact = Contact.find(params[:id])
    contact.destroy!
  end

  def search
    term = params[:term]
    @contacts = Contact.where("name LIKE :term OR email LIKE :term", term: "#{term}%")
    render json: {contacts: @contacts}.as_json
  end

  protected

  def contact_params
    params.require(:contact).permit(
      :id, :name, :email, :term
    )
  end
end
