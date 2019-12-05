class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
  #validates :created_at, presence: true
  mount_uploader :image, ImageUploader
end