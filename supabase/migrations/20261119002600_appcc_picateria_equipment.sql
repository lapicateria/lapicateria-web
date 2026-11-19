insert into public.admin_equipment_assets (location, name, status, fault_history)
select equipment.*
from (values
  ('Puesto 32', 'Cámara frigorífica grande', 'operativo', null),
  ('Puesto 32', 'Vitrina frigorífica en L', 'operativo', null),
  ('Puesto 32', 'Vitrina horizontal grande', 'inoperativo', null),
  ('Puesto 32', 'Armario bajo fregadero', 'inoperativo', null),
  ('Puesto 32', 'Frigorífico de cafetería de mostrador', 'inoperativo', null),
  ('Puesto 34', 'Vitrina de bebidas P34 1', 'operativo', null),
  ('Puesto 34', 'Vitrina de bebidas P34 2', 'operativo', null),
  ('Puesto 34', 'Botellero P34', 'operativo', null),
  ('Cafetería', 'Botellero cafetería 1', 'operativo', null),
  ('Cafetería', 'Botellero cafetería 2', 'operativo', null),
  ('Cafetería', 'Botellero cafetería 3', 'operativo', null),
  ('Cafetería', 'Vitrina de bebidas cafetería', 'operativo', null),
  ('Cafetería', 'Vinoteca', 'operativo', null),
  ('Cocina', 'Botellero de verdura', 'operativo', null),
  ('Cocina', 'Congelador de cocina', 'operativo', null),
  ('Cocina', 'Mesa frigorífica de cuatro puertas', 'en_revision', 'Pendiente de mantenimiento. Lectura aproximada comunicada: 8 °C. Uso durante el servicio y traslado de los productos a la cámara del puesto 32 al cierre.'),
  ('Cocina', 'Freidora principal', 'operativo', null),
  ('Cocina', 'Freidora auxiliar', 'operativo', null),
  ('Cocina', 'Plancha', 'operativo', null),
  ('Cocina', 'Jamonero', 'operativo', null),
  ('Cocina', 'Cocina de seis fuegos', 'operativo', null),
  ('Cocina', 'Brasa', 'operativo', null),
  ('Cocina', 'Vitrina de mostrador para producto', 'inoperativo', 'Vacía. Pendiente de mantenimiento.'),
  ('Almacén', 'Congelador de hielo embolsado', 'operativo', null)
) as equipment(location, name, status, fault_history)
where not exists (
  select 1 from public.admin_equipment_assets as existing
  where lower(trim(existing.name)) = lower(trim(equipment.name))
    and lower(trim(existing.location)) = lower(trim(equipment.location))
);
