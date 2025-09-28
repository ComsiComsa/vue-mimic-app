<template>
  <div class="app-table">
    <table class="app-table__table">
      <thead v-if="columns?.length" class="app-table__head">
        <tr class="app-table__row">
          <th
            v-for="col in columns"
            :key="col.key"
            class="app-table__th"
            :class="alignClass(col.align)"
            scope="col"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody class="app-table__body">
        <template v-for="(row, index) in rows" :key="index">
          <tr v-if="row.kind === 'data'" class="app-table__row">
            <td
              v-for="col in columns"
              :key="col.key"
              class="app-table__td"
              :class="alignClass(col.align)"
            >
              <slot :name="`cell-${col.key}`" :row="row.data" :value="row.data[col.key]">
                {{ row.data[col.key] }}
              </slot>
            </td>
          </tr>

          <tr v-else class="app-table__row app-table__row--summary">
            <td :colspan="columns.length" class="app-table__td app-table__td--summary">
              <div class="app-table__summary">
                <div class="app-table__summary-label">
                  <slot name="summary-label" :row="row">
                    <span v-html="row.label" />
                  </slot>
                </div>
                <div class="app-table__summary-value">
                  <slot name="summary-value" :row="row">
                    {{ row.value }}
                  </slot>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
type Align = 'start' | 'center' | 'end'

export interface AppTableColumn {
  key: string
  label: string
  align?: Align
}

export type AppTableDataRow = {
  kind: 'data'
  data: Record<string, unknown>
}

export type AppTableSummaryRow = {
  kind: 'summary'
  label: string
  value: unknown
}

export type AppTableRow = AppTableDataRow | AppTableSummaryRow

defineProps<{
  columns: AppTableColumn[]
  rows: AppTableRow[]
}>()

const alignClass = (align?: Align) =>
  align === 'end' ? 'is-end' : align === 'center' ? 'is-center' : 'is-start'
</script>

<style scoped lang="scss">
.app-table {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: #fff;

  &__table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 720px;
  }

  &__head {
    .app-table__th {
      background: #f1f1f1;
      color: #3d4551;
      font-weight: 600;
      text-align: left;
      padding: 0.625rem 0.75rem;
      border-bottom: 1px solid #e5e7eb;
      white-space: nowrap;
    }
  }

  &__body {
    .app-table__td {
      padding: 0.625rem 0.75rem;
      border-bottom: 1px solid #e5e7eb;
      color: #3d4551;
      vertical-align: top;
    }

    .app-table__row:hover .app-table__td {
      background: #f9fafb;
    }

    .app-table__td--summary {
      padding: 0.625rem 0.75rem;
      background: #fff;
    }
  }

  &__summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    font-weight: 600;
  }

  .is-start {
    text-align: left;
  }
  .is-center {
    text-align: center;
  }
  .is-end {
    text-align: right;
  }
}
</style>
