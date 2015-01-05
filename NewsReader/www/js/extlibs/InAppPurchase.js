/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).on("pageshow", "#Pinapppurchase",
    function() {
        var inappbilling=InAppBillingPlugin();
        inappbilling.init(
            function(){
                debuglog("InappBilling InitSuccess");
                document.getElementById('productlist').innerHTML='Produit 1<br/>Produit 2</br>Produit 3</br>';
            },
            function(){
                debuglog("InappBilling Init error");
                document.getElementById('productlist').innerHTML='not on sale 1<br/>not on sale 2</br>Produit 3</br>';
            }
                    );
            debuglog("Pinapppurchase shown");
        });

