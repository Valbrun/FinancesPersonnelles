USE [intra_finance]
GO
/****** Object:  StoredProcedure [dbo].[SelectAllMonth]    Script Date: 9/30/2020 10:41:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[SelectAllMonth]
AS
select * from month_bill order by timestamp desc
