# Chat-Space DB設計


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups,through:members
- has_many :members
- has_many :messages

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references :user|null: false,foreign_key: true|
|group_id|references :group|null: false,foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users,through:members
- has_many :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false,foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group