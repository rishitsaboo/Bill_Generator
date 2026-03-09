type StatCardProps ={
    title:string,
    value:number | string,
}

const StatCard = ({title, value}:StatCardProps) =>{
    return(
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 font-serif">
            <div className="gird grid-col-2 item-center">
                <div>
                <p className="text-3xl font-bold text-slate-400">
                    {title}
                </p>
                </div>
                <div className="pt-2 flex justify-between items-center">
                <p className="text-xl text-slate-400">
                    {value}
                </p>
                </div>
            </div>
        </div>
    );
};      
export default StatCard;
