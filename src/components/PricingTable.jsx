import React from 'react';

const PricingTable = () => {
  return (
    <div className="w-[1279px] h-[891px] mx-auto ">
      <table className="w-full table-fixed border-collapse border border-gray-300 ">
        {/* Table Header */}
        <thead>
          <tr className="h-[75px] bg-[#1F1F1F]">
            <th className="w-[319px] border border-[#262626] font-semibold text-[18px] leading-[27px] ">Feature</th>
            <th className="w-[319px] border border-[#262626] font-semibold text-[18px] leading-[27px]">Basic</th>
            <th className="w-[319px] border border-[#262626] font-semibold text-[18px] leading-[27px]">Standard</th>
            <th className="w-[319px] border border-[#262626] font-semibold text-[18px] leading-[27px]">Premium</th>
          </tr>
        </thead>

        {/* Table Rows */}
        <tbody>
            <tr  className="h-[75px]">
              <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Price </td>
              <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">$9.99/month </td>
              <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">$12.99/month </td>
              <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">$14.99/month </td>
            </tr>
            <tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Content</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] px-[24px] py-[24px]">Access to a wide selection of movies and shows, including some new releases.</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] px-[24px] py-[24px]">Access to a wider selection of movies and shows, including most new releases and exclusive content.</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] px-[24px] py-[24px]">Access to a widest selection of movies and shows, including all new releases and Offline Viewing.</td>
</tr>
<tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Devices</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Watch on one device simultaneously</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Watch on Two devices simultaneously</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Watch on Four devices simultaneously</td>
</tr>
<tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Free Trial</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">7 Days</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">7 Days</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">7 Days</td>
</tr>
<tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Cancel Anytime</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
</tr>
<tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">HDR</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">No</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
</tr>
<tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Dolby Atmos</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">No</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
</tr>
<tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Ad-Free</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">No</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes</td>
</tr>
<tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Offline Viewing</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">No</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes, for select titles</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes, for all titles</td>
</tr>
<tr className="h-[75px]">
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Family Sharing</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">No</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes, up to 5 family members</td>
  <td className="border border-[#262626] text-left font-normal text-[16px] leading-[24px] text-[#999999] pl-[24px] py-[24px]">Yes, up to 6 family members</td>
</tr>

         
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
