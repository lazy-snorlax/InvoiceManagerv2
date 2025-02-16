/* Insert statements to migrate legacy data to new table format */
-- Transaction Main
set IDENTITY_INSERT transaction_main ON
insert into transaction_main (id, business_no, type, company_no, order_no, payment_no, payment_detail, paid, note, created_at)
select
  [Transaction ID],
  [Business No],
  [Type],
  [Company No],
  [Order No],
  [Payment No],
  [Payment Detail],
  [Paid],
  [Note],
  [Date]
from [Table Transaction Main]
set IDENTITY_INSERT transaction_main OFF


-- Transaction Headers
set IDENTITY_INSERT transaction_headers ON
insert into transaction_headers (id, transaction_main_id, description, created_at)
select
	[Title No],
  [TransactionNo],
  [Title Description],
  getdate()
from [Table Transaction Items Title]
set IDENTITY_INSERT transaction_headers OFF


-- Transaction Lines
set IDENTITY_INSERT transaction_lines ON
insert into transaction_lines (id, transaction_header_id, item, description, tax, gst, cost, expense, created_at)
select
	[ID],
	[Title Item],
  [Item],
  [Description],
  [Tax%],
  [GST Collected],
  [Credit],
  [Expense],
  getdate()
from [Table Transaction Items]
set IDENTITY_INSERT transaction_lines OFF

-- Company
set IDENTITY_INSERT companies ON
insert into companies ( 
	id, 
  company_name, 
  contact_name, 
  abn,
  account_type,
  email,
  phone,
  mobile,
  location_address,
  location_city,
  location_state,
  location_post_code,
  postal_address,
  postal_city,
  postal_state,
  postal_post_code,
  created_at
)
select 
	[Company ID],
  [Company Name],
  [Contact Name1],
  [ABN2],
  [Account Type],
  [Email Address2],
  [Phone3],
  [Mobile2],
  [Address3],
  [City3],
  [State3],
  [Post Code3],
  [Address4],
  [City4],
  [State4],
  [Post Code4],
  getdate()
from [Table Company Detail]
set IDENTITY_INSERT companies OFF

-- Credit Type
set IDENTITY_INSERT credit_types ON
insert into credit_types ( 
	id, 
  description, 
  days, 
  created_at
)
select 
	[Account Type],
  [Account Description],
  [Account Days],
  getdate()
from [Table Credit Type]
set IDENTITY_INSERT credit_types OFF

