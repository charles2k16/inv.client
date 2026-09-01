import{Et as e,F as t,G as n,R as r,c as i,ct as a,d as o,f as s,g as c,h as l,l as u,r as d,tt as f,v as p}from"./BuJ5b8ic.js";import{t as m}from"./BCeQ66YF.js";import{g as h,r as g}from"#entry";import{t as _}from"./DIickFIx.js";import{r as v,t as y}from"./CLHiULdM.js";import{t as b}from"./83DizUSH.js";import{t as x}from"./CNs_Ozdc.js";var S=m`
  query MyReferralDashboard {
    myReferralDashboard {
      referralCode
      referralLink
      totalReferrals
      pendingReferrals
      successfulReferrals
      totalReferralEarnings
      withdrawnReferralEarnings
      availableReferralEarnings
    }
  }
`,C=m`
  query MyReferrals {
    myReferrals {
      id
      status
      createdAt
      referredUser { firstName lastInitial joinedAt }
      bonus { amount status paidAt }
    }
  }
`,w={key:0,class:`mt-6 space-y-3`},T={class:`mt-6 rounded-2xl bg-forest bg-ledger p-6 text-paper`},E={class:`mt-1.5 font-mono text-2xl tracking-widest`},D={class:`mt-4 flex gap-2`},O={class:`mt-5 grid grid-cols-3 gap-3`},k={class:`rounded-xl border border-ink/10 p-3.5 text-center`},A={class:`font-mono text-lg tabular`},j={class:`rounded-xl border border-ink/10 p-3.5 text-center`},M={class:`font-mono text-lg tabular text-forest`},N={class:`rounded-xl border border-ink/10 p-3.5 text-center`},P={class:`font-mono text-lg tabular text-gold-dark`},F={class:`mt-5 rounded-2xl border border-ink/10 p-5`},I={class:`flex items-center justify-between`},L={class:`mt-1.5 font-mono text-xl tabular text-forest`},R={class:`mt-1 text-[11px] text-ink/40`},z={class:`mt-7`},B={class:`mt-2 space-y-2.5`},V={class:`text-sm`},H={class:`mt-0.5 font-mono text-[11px] text-ink/40`},U={class:`text-right`},W={key:0,class:`mt-1 font-mono text-xs tabular text-forest`},G={key:0,class:`rounded-2xl border border-dashed border-ink/15 p-6 text-center text-sm text-ink/50`},K=p({__name:`index`,setup(p){x({layout:`default`,middleware:`auth`,title:`Referrals`});let{result:m,loading:K}=g(S),q=i(()=>m.value?.myReferralDashboard),{result:J}=g(C),Y=i(()=>J.value?.myReferrals??[]),X=f(!1);async function Z(){q.value&&(await navigator.clipboard.writeText(q.value.referralLink),X.value=!0,setTimeout(()=>X.value=!1,1800))}async function Q(){if(!q.value)return;let e={title:`Invest with me on Ferrow`,url:q.value.referralLink};if(navigator.share)try{await navigator.share(e)}catch{}else await Z()}return(i,f)=>{let p=_,m=h,g=b;return t(),s(`div`,null,[f[7]||=u(`p`,{class:`eyebrow`},`Referrals`,-1),f[8]||=u(`h1`,{class:`mt-1 font-display text-2xl`},`Share & earn`,-1),a(K)?(t(),s(`div`,w,[c(p,{"class-name":`h-32 w-full rounded-2xl`})])):a(q)?(t(),s(d,{key:1},[u(`div`,T,[f[0]||=u(`p`,{class:`eyebrow text-paper/60`},`Your referral code`,-1),u(`p`,E,e(a(q).referralCode),1),u(`div`,D,[u(`button`,{type:`button`,class:`flex-1 rounded-lg bg-paper/15 py-2.5 text-xs font-medium`,onClick:Z},e(a(X)?`Copied!`:`Copy link`),1),u(`button`,{type:`button`,class:`flex-1 rounded-lg bg-gold py-2.5 text-xs font-medium text-ink`,onClick:Q},` Share `)])]),u(`div`,O,[u(`div`,k,[u(`p`,A,e(a(q).totalReferrals),1),f[1]||=u(`p`,{class:`mt-0.5 text-[10px] text-ink/45`},`Total`,-1)]),u(`div`,j,[u(`p`,M,e(a(q).successfulReferrals),1),f[2]||=u(`p`,{class:`mt-0.5 text-[10px] text-ink/45`},`Successful`,-1)]),u(`div`,N,[u(`p`,P,e(a(q).pendingReferrals),1),f[3]||=u(`p`,{class:`mt-0.5 text-[10px] text-ink/45`},`Pending`,-1)])]),u(`div`,F,[u(`div`,I,[f[5]||=u(`p`,{class:`eyebrow`},`Referral earnings`,-1),c(m,{to:`/wallet/withdraw?wallet=REFERRAL`,class:`text-xs text-forest`},{default:n(()=>[...f[4]||=[l(`Withdraw`,-1)]]),_:1})]),u(`p`,L,`GHS `+e(a(v)(a(q).availableReferralEarnings)),1),u(`p`,R,`GHS `+e(a(v)(a(q).totalReferralEarnings))+` earned in total`,1)]),u(`section`,z,[f[6]||=u(`p`,{class:`eyebrow`},`Your referrals`,-1),u(`div`,B,[(t(!0),s(d,null,r(a(Y),n=>(t(),s(`div`,{key:n.id,class:`flex items-center justify-between rounded-xl border border-ink/10 p-4`},[u(`div`,null,[u(`p`,V,e(n.referredUser.firstName)+` `+e(n.referredUser.lastInitial)+`.`,1),u(`p`,H,`Joined `+e(a(y)(n.referredUser.joinedAt)),1)]),u(`div`,U,[c(g,{status:n.status===`SUCCESSFUL`?`COMPLETED`:`PENDING`},null,8,[`status`]),n.bonus?(t(),s(`p`,W,`+GHS `+e(a(v)(n.bonus.amount)),1)):o(``,!0)])]))),128)),a(Y).length===0?(t(),s(`p`,G,` No referrals yet — share your link above to get started. `)):o(``,!0)])])],64)):o(``,!0)])}}});export{K as default};