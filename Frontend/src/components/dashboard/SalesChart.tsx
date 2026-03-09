import { LineChart, Line, XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid} from "recharts"
import type { TrendPoint } from "../../types/dashboard";
type Props = { data: TrendPoint[] };

const SalesChart = ({data}:Props) =>{
    return(
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-serif ">
            <h2 className="text-lg font-semibold mb-6 text-slate-400">
                Mounthly Sales Trend
            </h2>
            <ResponsiveContainer width="100%" height={300} >

                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="1 1" /> 
                    <XAxis dataKey={"day"}
                            stroke="#94a3b8"/>
                    <YAxis dataKey="totalSales"/>

                    <Tooltip
                    contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #1e293b"}}
                    />
                    <Line 
                    type= "monotone"
                    dataKey="totalSales"
                    stroke= "#f69f3b"
                    strokeWidth= {3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
};

export default SalesChart
