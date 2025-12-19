"use client";

import { FenixButton, FenixCard } from "@fenix/ui";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun 21', entregas: 35 },
  { name: 'Mar 22', entregas: 80 },
  { name: 'Mié 23', entregas: 90 },
  { name: 'Jue 24', entregas: 115 },
  { name: 'Vie 25', entregas: 140 },
  { name: 'Sáb 26', entregas: 185 },
  { name: 'Dom 27', entregas: 195 },
];

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white p-6 rounded-[20px] shadow-sm">
          <div>
             <h1 className="text-3xl font-bold text-secondary">
              Panel de Control <span className="text-primary">Fénix</span>
            </h1>
            <p className="text-subtext mt-1">Bienvenido al sistema de logística ICBF</p>
          </div>
          <div className="flex gap-4">
             <FenixButton variant="secondary">
              🔔
            </FenixButton>
            <FenixButton variant="primary">
              + Nueva Carga Masiva
            </FenixButton>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FenixCard className="relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-subtext text-sm font-medium">Entregas Totales</h3>
                <p className="text-4xl font-bold text-secondary mt-2">1,245</p>
                <div className="flex items-center mt-4 gap-2">
                    <span className="text-xs font-bold text-success bg-green-50 px-3 py-1.5 rounded-full">
                    +12% vs mes anterior
                    </span>
                    <span className="text-xs text-subtext">En los últimos 30 días</span>
                </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          </FenixCard>
          
          <FenixCard className="relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-subtext text-sm font-medium">Pendientes Sync</h3>
                <p className="text-4xl font-bold text-warning mt-2">34</p>
                <div className="flex items-center mt-4 gap-2">
                    <span className="text-xs font-bold text-warning bg-orange-50 px-3 py-1.5 rounded-full">
                    Requiere atención
                    </span>
                    <span className="text-xs text-subtext">Dispositivos offline</span>
                </div>
            </div>
          </FenixCard>

          <FenixCard className="relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-subtext text-sm font-medium">Centros Activos</h3>
                <p className="text-4xl font-bold text-secondary mt-2">8</p>
                <div className="flex items-center mt-4 gap-2">
                    <span className="text-xs font-bold text-primary bg-blue-50 px-3 py-1.5 rounded-full">
                    8 de 10 operativos
                    </span>
                    <span className="text-xs text-subtext">Estado general óptimo</span>
                </div>
            </div>
          </FenixCard>
        </section>

        <section className="bg-white rounded-[20px] shadow-[0_20px_27px_0_rgba(0,0,0,0.05)] p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-secondary">Actividad Reciente</h2>
            <select className="bg-gray-50 border-none text-sm font-medium text-subtext p-2 rounded-lg cursor-pointer outline-none ring-1 ring-gray-100">
                <option>Últimos 7 días</option>
                <option>Último mes</option>
                <option>Año actual</option>
            </select>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEntregas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 12 }} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ stroke: '#0EA5E9', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="entregas" 
                    stroke="#0EA5E9" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorEntregas)" 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </main>
  );
}
