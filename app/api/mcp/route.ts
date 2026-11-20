import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, SITE, CATEGORIES } from '@/src/config/site';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { method, params } = body;

    if (method === 'tools/list') {
      return NextResponse.json({
        tools: [
          {
            name: 'get_products',
            description: 'List wholesale meat products by category (beef, lamb, goat, mutton) or subcategory.',
            inputSchema: {
              type: 'object',
              properties: {
                category: { type: 'string', enum: ['beef', 'lamb', 'goat', 'mutton'] },
                subcategory: { type: 'string', enum: ['single-cuts', 'meat-boxes', 'whole-carcasses', 'mixed-cuts'] },
              },
            },
          },
          {
            name: 'get_butcher_info',
            description: 'Get Ponde Meats Cowirra SA wholesale facility information, location, minimum orders and cold-chain specs.',
            inputSchema: { type: 'object', properties: {} },
          },
        ],
      });
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      if (toolName === 'get_products') {
        const cat = params?.arguments?.category;
        const filtered = cat ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;
        return NextResponse.json({
          content: [{ type: 'text', text: JSON.stringify(filtered, null, 2) }],
        });
      }

      if (toolName === 'get_butcher_info') {
        return NextResponse.json({
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  site: SITE.name,
                  abn: SITE.abn,
                  location: SITE.contact,
                  orderRules: SITE.orderRules,
                  categories: CATEGORIES.map((c) => c.name),
                },
                null,
                2
              ),
            },
          ],
        });
      }
    }

    return NextResponse.json({
      serverInfo: {
        name: 'ponde-meats-mcp',
        version: '1.0.0',
      },
      status: 'active',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid MCP request' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    server: 'ponde-meats-mcp-v1',
    capabilities: ['tools/list', 'tools/call'],
  });
}
