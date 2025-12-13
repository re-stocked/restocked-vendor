/**
 * EXEMPLO DE INTEGRAÇÃO DO WIDGET SHIPPO
 * 
 * Este ficheiro é apenas para referência. Não é usado diretamente no código.
 * 
 * Para integrar o widget Shippo no vendor panel, siga os passos abaixo:
 * 
 * ============================================================================
 * OPÇÃO 1: ADICIONAR AO COMPONENTE DE FULFILLMENT EXISTENTE
 * ============================================================================
 * 
 * Ficheiro: vendor-panel/src/routes/orders/order-detail/components/order-fulfillment-section/order-fulfillment-section.tsx
 * 
 * 1. Importe o widget:
 *    import { ShippoFulfillmentWidget } from "../../../../../components/shippo-fulfillment-widget"
 * 
 * 2. No componente Fulfillment (linha ~240), adicione o widget antes ou depois do conteúdo existente:
 * 
 *    const Fulfillment = ({ fulfillment, order, index }) => {
 *      // ... código existente ...
 * 
 *      return (
 *        <Container>
 *          {fulfillment.provider_id === "shippo" && (
 *            <ShippoFulfillmentWidget fulfillment={fulfillment} />
 *          )}
 *          
 *          {/* Resto do código existente do fulfillment... *\/}
 *        </Container>
 *      )
 *    }
 * 
 * ============================================================================
 * OPÇÃO 2: CRIAR SECÇÃO SEPARADA PARA SHIPPO
 * ============================================================================
 * 
 * Ficheiro: vendor-panel/src/routes/orders/order-detail/order-detail.tsx
 * 
 * 1. Importe o widget:
 *    import { ShippoFulfillmentWidget } from "../../../components/shippo-fulfillment-widget"
 * 
 * 2. Adicione a secção no TwoColumnPage.Main:
 * 
 *    <TwoColumnPage.Main>
 *      <OrderGeneralSection order={order} />
 *      <OrderSummarySection order={order} />
 *      <OrderPaymentSection order={order} />
 *      <OrderFulfillmentSection order={order} />
 *      
 *      {/* Secção Shippo *\/}
 *      {order.fulfillments?.filter(f => f.provider_id === "shippo").map((fulfillment) => (
 *        <ShippoFulfillmentWidget key={fulfillment.id} fulfillment={fulfillment} />
 *      ))}
 *    </TwoColumnPage.Main>
 * 
 * ============================================================================
 * NOTA: O widget só aparece quando há fulfillments criados pelo provider Shippo
 * ============================================================================
 * 
 * O fulfillment é criado automaticamente quando o vendor cria um fulfillment
 * no admin (através do botão "Create Fulfillment" na secção OrderFulfillmentSection).
 * 
 * O Shippo provider gera automaticamente:
 * - Etiqueta de envio (label_url)
 * - Número de tracking (tracking_number)
 * - Link de tracking (tracking_url)
 * - Informações da transportadora (carrier, service_level)
 */

// Não há código para executar neste ficheiro - é apenas documentação!
