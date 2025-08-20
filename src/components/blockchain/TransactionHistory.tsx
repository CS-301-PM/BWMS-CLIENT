import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react'
import { inventoryApi } from '../../api/endpoints'
import TransactionStatus from './TransactionStatus'

interface BlockchainTransaction {
  id: number
  tx_hash: string
  operation_type: string
  status: 'pending' | 'confirmed' | 'failed'
  confirmations: number
  created_at: string
  user: string
  details: any
}

const TransactionHistory: React.FC = () => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['blockchainTransactions'],
    queryFn: () => inventoryApi.getBlockchainLogs().then(res => res.data),
    refetchInterval: 10000, // Refetch every 10 seconds
  })

  const getOperationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'MOVEMENT': 'Stock Movement',
      'REQUEST': 'Stock Request',
      'DAMAGE': 'Damage Report',
      'DELIVERY': 'Supplier Delivery',
      'APPROVAL': 'Request Approval'
    }
    return labels[type] || type
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-destructive">
            Failed to load transaction history
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Transactions</CardTitle>
        <CardDescription>
          Recent blockchain operations and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Operation</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                </TableRow>
              ))
            ) : transactions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No blockchain transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions?.map((transaction: BlockchainTransaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {getOperationTypeLabel(transaction.operation_type)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {transaction.tx_hash ? (
                      <span className="text-muted-foreground">
                        {transaction.tx_hash.slice(0, 8)}...{transaction.tx_hash.slice(-6)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Pending...</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <TransactionStatus
                      status={transaction.status}
                      txHash={transaction.tx_hash}
                      confirmations={transaction.confirmations}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {transaction.user.slice(0, 8)}...
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDate(transaction.created_at)}
                  </TableCell>
                  <TableCell>
                    {transaction.tx_hash && (
                      <a
                        href={`https://etherscan.io/tx/${transaction.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TransactionHistory