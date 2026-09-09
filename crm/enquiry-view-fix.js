/* Boxwish Biz CRM — Enquiry View navigation */
(function(){
  function enquiryUrl(id){
    const p=location.pathname.replace(/\/crm\/?$/,'/crm/enquiries/detail.html');
    return location.origin+p+'?id='+encodeURIComponent(id);
  }
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-action="view-enquiry"]');
    if(!b)return;
    e.preventDefault(); location.assign(enquiryUrl(b.dataset.id));
  },true);
  const original=window.renderEnquiries;
  if(typeof original!=='function')return;
  window.renderEnquiries=function(){
    original();
    document.querySelectorAll('#enquiryTable tbody tr').forEach(function(row){
      const edit=row.querySelector('[data-action="edit-enquiry"]');
      const actions=row.querySelector('.row-actions');
      if(!edit||!actions||actions.querySelector('[data-action="view-enquiry"]'))return;
      const view=document.createElement('button');
      view.className='link-btn'; view.dataset.action='view-enquiry'; view.dataset.id=edit.dataset.id; view.textContent='View';
      actions.insertBefore(view,edit);
    });
  };
})();
