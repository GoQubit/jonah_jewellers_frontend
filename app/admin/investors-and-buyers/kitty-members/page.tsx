import React from 'react'
import KittyUserTableView from '../_components/kitty-user-table-view'

type Props = {}

const KittyMembersPage = (props: Props) => {
  return (
    <div className="mt-5">
      <KittyUserTableView />
    </div>
  )
}

export default KittyMembersPage