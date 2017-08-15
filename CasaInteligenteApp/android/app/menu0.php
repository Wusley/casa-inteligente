<?
	$btHome      = "botao_home_off.gif";
	$btQuemSomos = "botao_quemsomos_off.gif";
	$btProdutos  = "botao_produtos_off.gif";
	$btClientes  = "botao_clientes_off.gif";
	$btImprensa  = "botao_imprensa_off.gif";
	$btContato   = "botao_contato_off.gif";
	$btBlog      = "botao_blog_off.gif";

	switch ($pgAtual) {
          case "home":
            $btHome = "botao_home_on.gif";
            break;
          case "quemSomos":
            $btQuemSomos = "botao_quemsomos_on.gif";
            break;
		  case "produtos":
            $btProdutos = "botao_produtos_on.gif";
            break;
		  case "clientes":
            $btClientes = "botao_clientes_on.gif";
            break;
		  case "imprensa":
            $btImprensa = "botao_imprensa_on.gif";
            break;
		  case "contato":
            $btContato = "botao_contato_on.gif";
            break;
		  case "blog":
            $btBlog = "botao_blog_on.gif";
            break;
	}
?>
<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
	<tr bgcolor="#ECEBDC">
    	<td>
            <table class="header" border="0" align="center" cellpadding="0" cellspacing="0">
              <!--<tr>
                <td bgcolor="#ECEBDC">&nbsp;</td>
                <td bgcolor="#ECEBDC">
                  &nbsp;

                  <div id="busca">
                    <div class="bgInput">
                      <div class="input"> <input name="txtBusca" type="text" id="txtBusca" value="Busca" /> </div>
                    </div>
                      <div class="bt"><a href="#"><img src="images/icoBusca.jpg" width="23" height="22" border="0" /></a></div>
                  </div>
                </td>
              </tr>-->
              <tr>
                <td width="300">
                	<div class="logo">
                    	<? if($pgAtual == "home") { ?>
                        <h1><a href="<?=$RPATH?>/"><img src="<?=$RPATH?>/images/logoNatVida.png" border="0" alt="Natureza com Vida" /></a><span>Brindes Ecol&oacute;gicos - Brindes para Empresas - Natureza com Vida</span></h1>
                    	<? } else { ?>
                        <a href="<?=$RPATH?>/"><img src="<?=$RPATH?>/images/logoNatVida.png" border="0" alt="Natureza com Vida" /></a>
                    	<? } ?>
                    </div>
                </td>
                <td valign="bottom">
                  <div class="contato_topo">
                    <a href="https://www.facebook.com/naturezacomvida?fref=ts" target="_blank" class="ico-facebook">Facebook</a>
                    <!-- <a href="https://twitter.com/naturezacomvida" target="_blank" class="ico-twitter">Twitter</a> -->
                  	<span> (11) 2626.0163</span><img src="<?=$RPATH?>/images/phone.png" alt="Contato" />
                    <br />
                    <span style="font:14px Tahoma,Helvetica,Geneva,sans-serif; margin-top:5px;">Hor&aacute;rio de atendimento:<br />2&ordf; &agrave; 6&ordf; feira, 9h &agrave;s 17h.</span>
                    <br />
                    <span style="font:10px Tahoma,Helvetica,Geneva,sans-serif; text-align:right; margin-top:5px;">As solicita&ccedil;&otilde;es de or&ccedil;amento nos finais de semana e<br />feriados ser&atilde;o respondidas no primeiro dia &uacute;til seguinte.</span>
                  </div>
                  <div id="menu">
                        <div id="menuBotoes"> <a href="<?=$RPATH?>/"><img src="<?=$RPATH?>/images/<?=$btHome;?>" border="0" alt="" /></a> </div>
                        <div id="menuBotoes"> <a href="<?=$RPATH?>/quemSomos"><img src="<?=$RPATH?>/images/<?=$btQuemSomos;?>" border="0" alt="" /></a> </div>
                        <div id="menuBotoes"> <a href="<?=$RPATH?>/produtos"><img src="<?=$RPATH?>/images/<?=$btProdutos;?>" border="0" alt="" /></a> </div>
                        <div id="menuBotoes"> <a href="<?=$RPATH?>/clientes"><img src="<?=$RPATH?>/images/<?=$btClientes;?>" border="0" alt="" /></a> </div>
                        <div id="menuBotoes"> <a href="<?=$RPATH?>/imprensa"><img src="<?=$RPATH?>/images/<?=$btImprensa;?>" border="0" alt="" /></a> </div>
                        <div id="menuBotoes"> <a href="<?=$RPATH?>/contato"><img src="<?=$RPATH?>/images/<?=$btContato;?>" border="0" alt="" /></a> </div>
                        <div id="menuBotoes"> <a href="http://www.naturezacomvida.com.br/blog/" target="_blank"><img src="<?=$RPATH?>/images/<?=$btBlog;?>" border="0" alt="" /></a> </div>
                  </div>
                </td>
              </tr>
            </table>

						<? include "includes/menu-mobile.php"; ?>
		</td>
    </tr>
	<tr>
    	<td>
        	<div class="corpo">
	    		<div class="bg_corpo_topo"></div>
