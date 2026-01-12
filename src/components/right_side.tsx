import React,{useState} from "react";
interface BillItem {
  id: string;
  name: string;
  qty: number;
  amount: number;
}

interface RightSideProps {
  billItems: BillItem[];
}

const RightSide: React.FC<RightSideProps> = ({ billItems }) => {
  const total = billItems.reduce((sum, item) => sum + item.amount, 0);
  const now = new Date();
  const date = now.toLocaleDateString("en-IN",{
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const [customerName, setCustomerName] = useState<string>("");
  return (
    <div className="flex-1 p-4 overflow-auto">
      <h2 className="font-bold mb-2">Bill preview</h2>
      <div className="mb-4 w-full flex justify-center"> 
        <input 
        value={customerName} 
        onChange={(e) => setCustomerName(e.target.value)} 
        className="border border-gray-300 rounded px-3 py-1 w-full sm:w-52" 
        placeholder="Customer Name" /> 
        </div>
      {/* ✅ html2canvas SAFE container */}
      <div
        id="bill-preview"
        className="lg:sticky lg:top-0"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "'DM Sans', Arial, sans-serif",
          padding: "40px",
          margin:"1px",
          border:"2px solid #525151ff",
          borderRadius: "12px",
          minHeight: "550px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          marginBlock:"20px",
        }}
      >
        {/* Logo & Shop Name */}
        <div
          style={{
            height:"100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "16px 0",
          }}
        >
          <img
            src="/images/right_side/mainlogo.png"
            alt="Shop Logo"
            style={{ width: "85px", height: "85px", objectFit: "contain" }}
            crossOrigin="anonymous"
          />

          <div style={{ textAlign: "left" , paddingBottom:"10px"}}>
            <p
              style={{
                fontSize: "40px",
                fontWeight: 800,
                letterSpacing: "1px",
                color: "#5e2c13",
              }}
            >
              Kavita&apos;s
            </p>
            <p
              style={{
                fontSize: "40px",
                fontWeight: 800,
                letterSpacing: "1px",
                color: "#edb046",
              }}
            >
              Kitchen
            </p>
          </div>
        </div>

        <hr style={{ borderTop: "1px solid #dcdcdc", margin: "12px 0" }} />

        {/* Customer + Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            fontSize: "14px",
            fontWeight: 600,
          }}>

          <span>Name:{customerName || "---"}</span>
          <p>{date}</p>
        </div>

        <hr style={{ borderTop: "1px solid #dcdcdc", margin: "12px 0" }} />

        {/* Table Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.5fr 2fr 1fr 1fr",
            fontSize: "13px",
            fontWeight: 600,
            backgroundColor: "#000",
            color: "#fff",
            padding: "6px",
          }}
        >
          <span>No.</span>
          <span>Item</span>
          <span style={{ textAlign: "center" }}>Qty-(Kg/pcs)</span>
          <span style={{ textAlign: "right" }}>Amount</span>
        </div>

        {/* Items */}
        {billItems.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              padding: "24px",
              color: "#6b7280",
            }}
          >
            No items selected
          </p>
        ) : (
          billItems.map((item,index) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "0.5fr 2fr 1fr 1fr",
                fontSize: "13px",
                padding: "8px 0",
                borderBottom: "1px solid #d1d5db",
                borderLeft :"1px solid #d1d5db",
                borderRight :"1px solid #d1d5db",

              }}
            ><span style={{paddingLeft:"10px", fontWeight: 500}}>{index + 1}</span>
              <span style={{paddingLeft:"", fontWeight: 500}}>{item.name}</span>
              <span style={{ textAlign: "center" }}>{item.qty}</span>
              <span style={{ paddingRight:"10px" , textAlign: "right", fontWeight: 600 }}>
                ₹{item.amount.toFixed(2)}
              </span>
            </div>
          ))
        )}

        <hr style={{ borderTop: "1px solid #dcdcdc", margin: "16px 0" }} />

        {/* Total */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            fontSize: "18px", 
            fontWeight: 700,
            borderBottom: "1px solid #dcdcdc",
            paddingBottom: "8px",
          }}
        >
          <span>Total</span>
          <span style={{ textAlign: "right" }}>₹{total.toFixed(2)}</span>
        </div>


        {/* Address + QR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: "13px",
          }}
        >
          <div>
            <p style={{ fontWeight: 700, marginBottom: "4px", marginTop:"4px" }}>
              Pick-up Address:
            </p>
            <p>702, Vinay Complex, College Road,</p>
            <p>Bolav, Bharuch.</p>
            <p>+91 9377263148</p>
          </div>

          <img
            src="/images/right_side/QRcode.jpg"
            alt="QR Code"
            style={{ width: "96px", height: "96px", objectFit: "contain",marginTop:"4px"  }}
            crossOrigin="anonymous"
          />
        </div>

        <hr style={{ borderTop: "1px solid #dcdcdc", margin: "12px 0" }} />

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#4b5563",
            paddingTop: "8px",
          }}
        >
          Thank you for your business!
        </p>
      </div>
    </div>
  );
};

export default RightSide;
