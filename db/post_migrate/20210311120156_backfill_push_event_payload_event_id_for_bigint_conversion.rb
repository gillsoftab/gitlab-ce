# frozen_string_literal: true

class BackfillPushEventPayloadEventIdForBigintConversion < ActiveRecord::Migration[6.0]
  include Gitlab::Database::MigrationHelpers

  DOWNTIME = false

  def up
    return unless Gitlab.dev_env_or_com?

    backfill_conversion_of_integer_to_bigint :push_event_payloads, :event_id, primary_key: :event_id,
      batch_size: 15000, sub_batch_size: 100
  end

  def down
    return unless Gitlab.dev_env_or_com?

    Gitlab::Database::BackgroundMigration::BatchedMigration
      .where(job_class_name: 'CopyColumnUsingBackgroundMigrationJob')
      .where(table_name: 'push_event_payloads', column_name: 'event_id')
      .where('job_arguments = ?', %w[event_id event_id_convert_to_bigint].to_json)
      .delete_all
  end
end
