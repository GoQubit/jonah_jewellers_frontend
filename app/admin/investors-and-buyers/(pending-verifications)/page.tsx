import DataTable, { useDataTable } from '@/components/data-table'
import React from 'react'
import PendingVerificationTableView from './_components/pending-verification-table-view'

type Props = {}

const PendingVerificationsPage = (props: Props) => {

  return (
    <div>
      <PendingVerificationTableView />
    </div>
  )
}

export default PendingVerificationsPage