import tw from 'tailwind-styled-components';

export const Table = tw.table`
        w-full
        border-collapse
        overflow-hidden
        bg-white
        divide-y
        divide-gray-200
        shadow-md
        `;

export const TableRow = tw.tr``;

export const TableHeader = tw.th`
    px-6
    py-3
    text-left
    font-bold
    uppercase
    text-gray-700
    bg-gray-200
    border-b
    border-gray-200
    `;

export const TableCell = tw.td`
    px-6
    py-4
    whitespace-nowrap
    text-sm
    font-medium
    text-gray-900
    border-b
    border-gray-200
    `;
