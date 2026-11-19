insert into storage.buckets (id, name, public)
values ('picateria-appcc-documents', 'picateria-appcc-documents', false)
on conflict (id) do update set public = false;
