# Widget Shippo Fulfillment - Vendor Panel

Este diretório contém os componentes React para exibir informações de fulfillment do Shippo no vendor panel.

## Ficheiros

### `shippo-fulfillment-widget.tsx`
Widget principal que exibe:
- ✅ Número de tracking com cópia rápida
- ✅ Status do envio (Shipped / Ready to Ship)
- ✅ Transportadora e nível de serviço
- ✅ Botão para tracking da encomenda
- ✅ Botão para download da etiqueta PDF
- ✅ Datas de criação e envio

### `shippo-fulfillment-example.tsx`
Ficheiro de documentação com exemplos de como integrar o widget nas páginas existentes do vendor panel.

## Como usar

O widget **só aparece quando existe um fulfillment criado pelo provider Shippo**. Quando o vendor cria um fulfillment no admin, o Shippo provider gera automaticamente:
- Etiqueta de envio em PDF
- Número de tracking
- Link para tracking
- Informações da transportadora

### Opção 1: Integrar no componente de fulfillment existente

Edite o ficheiro:
```
vendor-panel/src/routes/orders/order-detail/components/order-fulfillment-section/order-fulfillment-section.tsx
```

Adicione no componente `Fulfillment` (por volta da linha 240):

```tsx
import { ShippoFulfillmentWidget } from "../../../../../components/shippo-fulfillment-widget"

const Fulfillment = ({ fulfillment, order, index }) => {
  // ... código existente ...

  return (
    <Container>
      {fulfillment.provider_id === "shippo" && (
        <ShippoFulfillmentWidget fulfillment={fulfillment} />
      )}
      
      {/* Resto do código existente... */}
    </Container>
  )
}
```

### Opção 2: Criar secção separada

Edite o ficheiro:
```
vendor-panel/src/routes/orders/order-detail/order-detail.tsx
```

Adicione após `OrderFulfillmentSection`:

```tsx
import { ShippoFulfillmentWidget } from "../../../components/shippo-fulfillment-widget"

// No componente OrderDetail:
<TwoColumnPage.Main>
  <OrderGeneralSection order={order} />
  <OrderSummarySection order={order} />
  <OrderPaymentSection order={order} />
  <OrderFulfillmentSection order={order} />
  
  {/* Secção Shippo */}
  {order.fulfillments
    ?.filter(f => f.provider_id === "shippo")
    .map((fulfillment) => (
      <ShippoFulfillmentWidget 
        key={fulfillment.id} 
        fulfillment={fulfillment} 
      />
    ))
  }
</TwoColumnPage.Main>
```

## Props do Widget

```typescript
interface ShippoFulfillmentWidgetProps {
  fulfillment: {
    id: string
    shipped_at?: string | null
    created_at: string
    data?: {
      tracking_number?: string
      tracking_url?: string
      label_url?: string
      carrier?: string
      service_level?: string
    }
  }
}
```

## Comportamento

- **Badge verde "Shipped"**: Quando `fulfillment.shipped_at` existe
- **Badge laranja "Ready to Ship"**: Quando a etiqueta foi criada mas ainda não foi marcada como enviada
- **Botão Track Package**: Só aparece se `tracking_url` existe
- **Botão Download Label**: Só aparece se `label_url` existe
- **Copy tracking**: Permite copiar o número de tracking rapidamente

## Estilo

O widget usa os componentes do `@medusajs/ui` e segue o design system do Medusa Admin, garantindo consistência visual com o resto do vendor panel.
