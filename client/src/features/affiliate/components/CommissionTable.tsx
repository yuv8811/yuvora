import React from 'react';
import { CommissionTier } from '@shared/schemas/affiliate.schema';
import './CommissionTable.css';

export interface CommissionTableProps {
  tiers: CommissionTier[];
}

export const CommissionTable: React.FC<CommissionTableProps> = ({ tiers }) => {
  return (
    <div className="table-responsive">
      <table className="data-table" aria-label="Affiliate commission structure tiers">
        <thead>
          <tr>
            <th scope="col">Partner Tier</th>
            <th scope="col">Active Store Referrals</th>
            <th scope="col">Recurring Commission Rate</th>
            <th scope="col">Duration</th>
            <th scope="col">Partner Perk</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, idx) => (
            <tr key={idx}>
              <th scope="row" style={{ fontWeight: 700, color: 'var(--color-text)' }}>
                {tier.tier}
              </th>
              <td>{tier.activeReferrals}</td>
              <td className="tier-highlight">{tier.commissionRate}</td>
              <td>{tier.recurringPeriod}</td>
              <td>{tier.perk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
