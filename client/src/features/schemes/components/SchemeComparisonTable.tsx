import React from 'react';
import { SchemeComparisonColumn } from '@shared/schemas/scheme.schema';
import '../../affiliate/components/CommissionTable.css';

export interface SchemeComparisonTableProps {
  columns: SchemeComparisonColumn[];
}

export const SchemeComparisonTable: React.FC<SchemeComparisonTableProps> = ({ columns }) => {
  return (
    <div className="table-responsive">
      <table className="data-table" aria-label="Scheme features comparison table">
        <thead>
          <tr>
            <th scope="col">Scheme Program</th>
            <th scope="col">Discount / Benefit</th>
            <th scope="col">Eligibility Summary</th>
            <th scope="col">Support Channel</th>
            <th scope="col">Co-Marketing Opportunity</th>
            <th scope="col">Dev Store Licenses</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((col) => (
            <tr key={col.schemeId}>
              <th scope="row" style={{ fontWeight: 700, color: 'var(--color-text)' }}>
                {col.name}
              </th>
              <td className="tier-highlight">{col.discount}</td>
              <td>{col.eligibilitySummary}</td>
              <td>{col.support}</td>
              <td>{col.coMarketing}</td>
              <td>{col.devStores}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
