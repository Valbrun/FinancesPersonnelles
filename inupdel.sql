USE [intra_finance]
GO
/****** Object:  StoredProcedure [dbo].[inupdel]    Script Date: 9/30/2020 10:40:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[inupdel] (			@id_mois     NCHAR(10),  
                                    @budget    NCHAR(10),  
                                    @taxes     NCHAR(10),  
                                    @loyer       NCHAR(10),   
                                    @nourriture  NCHAR(10),  
									@transport NCHAR(10), 
									@communication NCHAR(10), 
									@annee NCHAR(10), 
									@divers NCHAR(10), 	
                                    @type NVARCHAR(20) = '')  
AS  
  BEGIN  
      IF @type = 'Insert'  
        BEGIN  
            INSERT INTO month_bill  
                        (id_mois,  
                         budget,  
                         taxes,  
                         loyer,  
                         nourriture,
						 transport,
						 communication,
						 annee,divers)  
            VALUES     ( @id_mois          ,
                                    @budget    ,  
                                    @taxes      ,  
                                    @loyer      ,   
                                    @nourriture  ,  
									@transport  , 
									@communication  , 
									@annee  , 
									@divers  ) 	
        END  
  
      IF @type = 'Select'  
        BEGIN  
            SELECT *  
            FROM   month_bill  
        END  
  
      IF @type = 'Update'  
        BEGIN  
            UPDATE month_bill 
            SET    id_mois = @id_mois,  
                   budget = @budget,  
                   taxes = @taxes,  
                   loyer = @loyer,
				   nourriture=@nourriture,
				   transport=@transport,
				   communication=@communication,
				   annee=@annee,
				   divers=@divers

            WHERE  id_mois = @id_mois  
        END  
      ELSE IF @type = 'Delete'  
        BEGIN  
            DELETE FROM  month_bill  
            WHERE  id_mois = @id_mois  
        END  
  END   