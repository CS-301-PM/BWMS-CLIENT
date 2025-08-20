import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useToast } from '../../hooks/use-toast'
import { useBlockchainOperations } from '../../hooks/useBlockchainOperations'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'

const TransactionVerifier: React.FC = () => {
  const [txHash, setTxHash] = useState('')
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)
  const { useVerifyTransaction } = useBlockchainOperations()
  const verifyMutation = useVerifyTransaction()
  const { toast } = useToast()

  const handleVerify = async () => {
    if (!txHash.trim()) {
      toast({
        title: 'Transaction hash required',
        description: 'Please enter a transaction hash to verify',
        variant: 'destructive',
      })
      return
    }

    try {
      const isValid = await verifyMutation.mutateAsync(txHash.trim())
      setVerificationResult(isValid)
    } catch (error) {
      setVerificationResult(false)
    }
  }

  const resetVerification = () => {
    setTxHash('')
    setVerificationResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Verifier</CardTitle>
        <CardDescription>
          Verify the authenticity of a blockchain transaction
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="txHash">Transaction Hash</Label>
          <Input
            id="txHash"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="Enter transaction hash (0x...)"
            className="font-mono"
          />
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleVerify}
            disabled={verifyMutation.isLoading || !txHash.trim()}
          >
            {verifyMutation.isLoading ? 'Verifying...' : 'Verify Transaction'}
          </Button>
          <Button variant="outline" onClick={resetVerification}>
            Clear
          </Button>
        </div>

        {verificationResult !== null && (
          <div className={`p-4 rounded-lg border ${
            verificationResult 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              {verificationResult ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Transaction Verified</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5" />
                  <span className="font-medium">Transaction Invalid</span>
                </>
              )}
            </div>
            <p className="text-sm mt-2">
              {verificationResult
                ? 'This transaction has been successfully verified on the blockchain.'
                : 'This transaction could not be verified or does not exist on the blockchain.'
              }
            </p>
            
            {verificationResult && txHash && (
              <div className="mt-3">
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm hover:underline"
                >
                  View on Explorer <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>• Verify that transactions were properly recorded on the blockchain</p>
          <p>• Ensure data integrity and immutability</p>
          <p>• Cross-reference with internal records</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionVerifier