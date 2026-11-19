-- New Supabase projects can have automatic Data API grants disabled.
grant usage on schema public to service_role;

grant select, insert, update, delete on table
  public.admin_annual_verification_records,
  public.admin_appcc_monthly_signatures,
  public.admin_checklist_records,
  public.admin_cleaning_records,
  public.admin_equipment_alerts,
  public.admin_fryer_oil_records,
  public.admin_goods_reception_records,
  public.admin_incident_records,
  public.admin_inspection_records,
  public.admin_maintenance_records,
  public.admin_temperature_records,
  public.admin_water_records
to service_role;

grant select on table public.admin_inbox_documents_view to service_role;

-- Only the trusted backend may call these routines.
revoke execute on function
  public.admin_activate_historical_stock(),
  public.admin_rebuild_inventory_cache(),
  public.admin_inbox_bulk_update(uuid[], text, text, uuid, text),
  public.admin_make_production_batch_code(text, date),
  public.admin_execute_production_batch(jsonb)
from public, anon, authenticated;
