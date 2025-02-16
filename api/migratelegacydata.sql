
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

