import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { PER_PAGE } from "@/shared/utils";

import { updatePaginationState } from "./update-pagination-state";
import { updateSortingState } from "./update-sorting-state";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

export interface BaseTableProps<TData> {
  data: TData[];
  pageCount?: number;
  columns: ColumnDef<TData>[];

  // Server-side processing: sorting, pagination
  serverSideProcessing?: boolean;

  // Expandeble rows
  getRowCanExpand?: (row: Row<TData>) => boolean; // Enables the ability to expand row. Use `() => true` when want to expand all rows.
  renderSubComponent?: React.FC<{ row: Row<TData> }>; // Component to render expanded row.

  // Selectable rows
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean); // Enables the ability to select row.
  batchActionsBar?: React.FC<{ rows: Row<TData>[]; resetRowSelection(): void }>; // Component to render batch actions bar for slected rows

  // Sorting.
  enableSorting?: boolean; // Enables sorting for table.

  // Placeholder for empty table
  emptyMessage?: string;

  // Handles row click. Can not be combined with `enableRowSelection` && expandable rows.
  onRowClick?: (row: Row<TData>) => void;
}

type UpdaterFn<T> = (previousState: T) => T;

/**
 * Table component that uses the react-table library to render a table.
 * https://tanstack.com/table/v8
 *
 * The most important props are:
 *  - `data`: the data to render in the table
 *  - `columns`: ColumnsDef. You can finde more info about it on https://tanstack.com/table/v8/docs/guide/column-defs
 *  - `emptyMessage`: the message to show when there is no data to render
 *
 * Usecases:
 * 1. Sortable table
 *    - set `enableSorting` property of component to true. It will enable sorting for all columns.
 *      If you want to disable sorting for some particular columns you can pass
 *     `enableSorting = false` to the column def.
 *    - table component stores the sorting state in URLSearchParams. Use `sortBy` and `sortDirection`
 *      search param to set default sortings.
 *    - use `id` property of the column def to set the sortBy for server side sorting.
 *
 * 2. Pagination
 *    - pagination enabled by default.
 *    - use `perPage` search param to manage default page size.
 *    - use `page` search param to manage default page index.
 *    - use `pageCount` prop to set the total number of pages only in case of server side processing.
 *
 * 3. Expandable rows
 *    - use `getRowCanExpand` prop to set a function that returns true if the row can be expanded.
 *    - use `renderSubComponent` prop to provide a sub component for each expanded row.
 *
 * 4. Row selection
 *    - use `enableRowSelection` prop to enable row selection. This prop can be a boolean or
 *      a function that returns true if the particular row can be selected.
 *    - use `batchActionsBar` prop to provide a component that will be rendered at the top of the table
 *      when row selection is enabled and there are selected rows.
 *
 * 5. Server side processing:
 *    - set `serverSideProcessing` to true
 *    - set `pageCount` to the total number of pages
 *    - use URLSearchParams to get the pagination and sorting state from the url for your server side processing.
 */

export function BaseTable<T>({
  data,
  pageCount,
  columns,
  getRowCanExpand,
  // renderSubComponent: SubComponent,
  serverSideProcessing = false,
  enableSorting = false,
  enableRowSelection = false,
  // batchActionsBar: BatchActionsBar,
  emptyMessage,
  onRowClick,
}: BaseTableProps<T>) {
  // const table = useReactTable({
  //   data,
  //   columns,
  //   // Pipeline
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   //
  //   debugTable: true,
  // });
  const router = useRouter();
  const getPaginationFromSearchParams = (searchParams) => {
    const { page, perPage } = searchParams;
    const pageIndex = page ? Number(page) - 1 : 0;

    return {
      pageIndex,
      pageSize: Number(perPage || PER_PAGE),
    };
  };

  const getSortingFromSearchParams = (searchParams) => {
    const { sortBy, sortDirection } = searchParams;

    if (!sortBy) return [];

    return [{ id: sortBy, desc: sortDirection === "desc" }];
  };

  const onSortingChange = useCallback(
    (updater: UpdaterFn<SortingState>) => {
      const newState = updateSortingState(updater, router.query);

      router.push({ query: newState });

      return newState;
    },
    [router],
  );
  const onPaginationChange = useCallback(
    (updater: UpdaterFn<PaginationState>) => {
      const newState = updatePaginationState(updater, router.query);

      console.log("file: BaseTable.tsx ~ line 155 ~ newState", newState);

      router.push({ query: newState });

      return newState;
    },
    [router],
  );

  const table = useReactTable({
    data,
    pageCount,
    columns,
    state: {
      sorting: getSortingFromSearchParams(router.query),
      pagination: getPaginationFromSearchParams(router.query),
    },
    onSortingChange: onSortingChange as OnChangeFn<SortingState>,
    onPaginationChange: onPaginationChange as OnChangeFn<PaginationState>,
    // onRowSelectionChange: setRowSelection,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: serverSideProcessing,
    manualPagination: serverSideProcessing,
    enableSorting,
    autoResetPageIndex: false,
    enableRowSelection,
  });

  const handleRowClick = (row: Row<typeof data>) => (e: React.MouseEvent) => {
    // If row selection is enabled do not handle row click.
    if (enableRowSelection) return undefined;

    // If row can be expanded do not handle row click.
    if (row.getCanExpand()) {
      e.stopPropagation();

      return row.toggleExpanded();
    }

    if (onRowClick) {
      e.stopPropagation();

      return onRowClick(row);
    }

    return undefined;
  };

  return (
    <div className="mt-4 flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        scope="col"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="w-full divide-y divide-gray-200 bg-white">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row
                      .getVisibleCells()
                      .map(({ id, getContext, column: { columnDef } }) => (
                        <td key={id} style={columnDef.meta}>
                          {flexRender(columnDef.cell, getContext())}
                        </td>
                      ))}
                  </tr>
                ))}

                {/* {table.getRowModel().rows.length === 0 && (
          <S.Row>
            <S.EmptyTableMessageCell colSpan={100}>
              {emptyMessage || "No rows found"}
            </S.EmptyTableMessageCell>
          </S.Row>
        )} */}
              </tbody>
            </table>
            <div className="flex items-center gap-2">
              <button
                className="rounded border p-1"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
              >
                {"<<"}
              </button>
              <button
                className="rounded border p-1"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                {"<"}
              </button>
              <button
                className="rounded border p-1"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                {">"}
              </button>
              <button
                className="rounded border p-1"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                {">>"}
              </button>
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  className="w-16 rounded border p-1"
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  type="number"
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;

                    table.setPageIndex(page);
                  }}
                />
              </span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              {/* {dataQuery.isFetching ? "Loading..." : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
