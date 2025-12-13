import { Container, Heading, Button, Badge, Copy } from "@medusajs/ui"
import { 
  ArchiveBox, 
  ArrowDownTray, 
  ArrowUpRightOnBox 
} from "@medusajs/icons"

interface ShippoFulfillmentData {
  tracking_number?: string
  tracking_url?: string
  label_url?: string
  carrier?: string
  service_level?: string
  shipment_id?: string
}

interface ShippoFulfillmentWidgetProps {
  fulfillment: {
    id: string
    shipped_at?: string | null
    created_at: string
    data?: ShippoFulfillmentData
  }
}

/**
 * Widget to display Shippo fulfillment information in the vendor panel
 * Shows tracking information, carrier details, and download links for labels
 */
export function ShippoFulfillmentWidget({ fulfillment }: ShippoFulfillmentWidgetProps) {
  const data = fulfillment.data as ShippoFulfillmentData

  if (!data || !data.tracking_number) {
    return null
  }

  const handleDownloadLabel = () => {
    if (data.label_url) {
      window.open(data.label_url, '_blank')
    }
  }

  const handleOpenTracking = () => {
    if (data.tracking_url) {
      window.open(data.tracking_url, '_blank')
    }
  }

  const getStatusBadge = () => {
    if (fulfillment.shipped_at) {
      return <Badge color="green">Shipped</Badge>
    }
    return <Badge color="orange">Ready to Ship</Badge>
  }

  return (
    <Container className="mt-4 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ArchiveBox className="text-ui-fg-subtle" />
          <Heading level="h3">Shipping Information</Heading>
        </div>
        {getStatusBadge()}
      </div>

      <div className="space-y-4">
        {/* Tracking Number */}
        {data.tracking_number && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ui-fg-subtle">Tracking Number</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-mono font-medium">{data.tracking_number}</p>
                <Copy content={data.tracking_number} />
              </div>
            </div>
            {data.tracking_url && (
              <Button
                variant="secondary"
                size="small"
                onClick={handleOpenTracking}
              >
                Track Package
                <ArrowUpRightOnBox className="ml-2" />
              </Button>
            )}
          </div>
        )}

        {/* Carrier & Service Level */}
        <div className="grid grid-cols-2 gap-4">
          {data.carrier && (
            <div>
              <p className="text-sm text-ui-fg-subtle">Carrier</p>
              <p className="font-medium mt-1">{data.carrier}</p>
            </div>
          )}
          {data.service_level && (
            <div>
              <p className="text-sm text-ui-fg-subtle">Service Level</p>
              <p className="font-medium mt-1">{data.service_level}</p>
            </div>
          )}
        </div>

        {/* Shipping Label */}
        {data.label_url && (
          <div className="pt-4 border-t border-ui-border-base">
            <Button
              variant="primary"
              onClick={handleDownloadLabel}
              className="w-full"
            >
              <ArrowDownTray className="mr-2" />
              Download Shipping Label
            </Button>
            <p className="text-xs text-ui-fg-subtle text-center mt-2">
              Print this label and attach it to your package
            </p>
          </div>
        )}

        {/* Shipping Dates */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ui-border-base">
          <div>
            <p className="text-sm text-ui-fg-subtle">Label Created</p>
            <p className="text-sm mt-1">
              {new Date(fulfillment.created_at).toLocaleDateString()}
            </p>
          </div>
          {fulfillment.shipped_at && (
            <div>
              <p className="text-sm text-ui-fg-subtle">Shipped</p>
              <p className="text-sm mt-1">
                {new Date(fulfillment.shipped_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
