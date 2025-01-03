import React from 'react';

interface TableHeaderProps {
	headers: any[];
	onSortColumnChange: (column: any) => void;
	sortColumn: any;
	sortDirection: any;
}

export const TableHeader = ({
	headers,
	onSortColumnChange,
	sortColumn,
	sortDirection,
}: TableHeaderProps) => {
	const handleHeaderClick = (column: any) => {
		onSortColumnChange(column);
	};

	return (
		<thead>
			<tr>
				{headers.map((header) => (
					<th key={header.column} onClick={() => handleHeaderClick(header.column)}>
						{header.label}{' '}
						{sortColumn === header.column && (
							<span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
						)}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
