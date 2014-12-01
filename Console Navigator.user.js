// ==UserScript==
// @name          Console Navigator
// @namespace     http://www.sisense.com
// @description   Navigate SFDC List
// @require http://code.jquery.com/jquery-latest.js
// @include       https://na14.salesforce.com/00Q?*
// @match https://na14.salesforce.com/00Q?*
// ==/UserScript==
var index;

$(document).ready(function () 
{
    
    debugger;


    
    function nextItem() 
    {
        var table =  $('table')[0];
    
        var selectedRow = $(".list tr.bRowHilight");
        
        var refreshItem = $(window.parent.document).find('.consoleMenu #rottenImage');
        
        //handleFilterSelect('All Attp Contact');
        debugger;
        
        //if there is a new item refresh the list. 
        if(refreshItem && refreshItem.attr('style').indexOf('color: rgb(255, 0, 0)') > -1 && refreshItem.attr('style').indexOf('display: none') == -1)
        {
        	refreshItem.trigger("click");
            return;
        }
        
        if(!selectedRow || selectedRow.length < 1)
        {
            debugger;
            selectedRow = $('table')[0].rows[0];
        }
        
        var nextRow = $(selectedRow).next();
        
        //simulate last call update to avoid seeing this lead
        var callNA = $(window.parent.document).find('[name=mainFrame]').contents().find("[name=update_last_call").first();
        
        if(callNA)
        	callNA.trigger('click');
        
        if(nextRow && nextRow.length > 0)
        {      
            var cells = nextRow.find('td');
            
            var link = $(cells[1]).find('a').attr("href");

            link = link.replace("javascript:srcUp(%27%2F", "/").replace("%3D", "=").replace(")", "").replace("%3F", "?").replace("%27;", "");
            
            //sfdc code
            srcUp(link);
        }
        else
        {
            debugger;
            
            var nextPage = $('.next');
            
            if(nextPage && nextPage.length > 0)
            {
                var nextPageLink = decodeURIComponent( $(nextPage).find('a').attr("href"));
                
                nextPageLink = nextPageLink.replace("javascript:srcSelf('", "").replace("');", "");
                
                srcSelf(nextPageLink);
            }
            else
            {
        		location.reload();
            }
        }
      
    }
    
    
    var menu = '';
    
    var menuobj = '';
    
    if (true)
    {
      menuobj = document.createElement('div');
      menuobj.style.position = 'fixed';
      menuobj.style.top = '0px';
      menuobj.style.left = '50%';
      menuobj.style.padding = '1px';
      menuobj.style.backgroundColor = '#fff';
      menuobj.innerHTML = "<input type='button' value='Next Call' id='next_call' />";
      body = document.getElementsByTagName('body')[0];
      body.appendChild(menuobj);
        
      $(menuobj).on('click', '#next_call', function(){
          nextItem();
	  });
        

    }
});
