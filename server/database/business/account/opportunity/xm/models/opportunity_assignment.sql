select private.create_model(

-- Model name, schema, table

'opportunity_assignment', '', 'xm.opportunity_info, private.docinfo',

E'{
  "docinfo.id as guid",
  "docinfo.source_id as source",
  "docinfo.source_type as source_type",
  "docinfo.purpose as purpose",
  "opportunity_info as opportunity"
}',

-- Rules

E'{"

-- insert rules

create or replace rule \\"_CREATE\\" as on insert to xm.opportunity_assignment 
  do instead

insert into private.docinfo (
  id,
  source_id,
  source_type,
  target_id,
  target_type,
  purpose )
values (
  new.guid,
  new.source,
  new.source_type,
  (new.opportunity).guid,
  \'OPP\',
  new.purpose );
  
","

-- update rule

create or replace rule \\"_UPDATE\\" as on update to xm.opportunity_assignment 
  do instead nothing;

","

-- delete rules
  
create or replace rule \\"_DELETE\\" as on delete to xm.opportunity_assignment 
  do instead

delete from private.docinfo
where ( id = old.guid );


"}',

-- Conditions, Comment, System, Nested

E'{"opportunity_info.guid=target_id","docinfo.target_type=\'OPP\'"}', 'Opportunity Assignment Model', true, true);