import React, { useState, useRef } from "react";
import AddItemModal from "../components/AddItemModalt.tsx";
import RightSide from "../components/right_side.tsx"
import html2canvas from "html2canvas";
import { Search } from "lucide-react";


/* ---------------------- Types ---------------------- */

type Category =
  | "Namkeens"
  | "Sweets"
  | "Nasta_Items"
  | "Sabzi"
  | "Others";

type Item = {
  id: string;
  name: string;
  image: string;
  amount: number;
  isCustom?:boolean
};

type AddedItem = Item & {
  qtyType: string;
  kg?: string;
  gram?: string;
  pcs?: string;
  total: number;
};

/* ---------------------- Constants ---------------------- */

const categories: Category[] = [
  "Namkeens",
  "Sweets",
  "Nasta_Items",
  "Sabzi",
  "Others",
];
const BASE = import.meta.env.BASE_URL;

// prettier-ignore
const items: Record<Category, Item[]> = {

  Namkeens: [
    { id: "All-1", name: "Mathri", image: `${BASE}/images/Namkeens/mathri.jpeg`, amount: 300 },
    { id: "All-2", name: "Mathri (wheat)", image: `${BASE}/images/Namkeens/mathri_wheat.jpg`, amount: 300 },
    { id: "All-3", name: "Methi Mathri", image: `${BASE}/images/Namkeens/methi_mathri.jpg`, amount: 300 },
    { id: "All-4", name: "Methi Mathri (wheat)", image: `${BASE}/images/Namkeens/methi_mathri_wheat.png`, amount: 300 },
    { id: "All-5", name: "Jeera Mathri", image: `${BASE}/images/Namkeens/jeera_mathri.jpg`, amount: 300 },
    { id: "All-6", name: "Chilli-flakes Mathri", image: `${BASE}/images/Namkeens/chilli_flakes_mathri.jpg`, amount: 300 },
    { id: "All-7", name: "Normal Nimki", image: `${BASE}/images/Namkeens/normal_nimki.jpg`, amount: 300 },
    { id: "All-8", name: "Masala Nimki", image: `${BASE}/images/Namkeens/masala_nimki.jpg`, amount: 300 },
    { id: "All-9", name: "Pudina Nimki", image: `${BASE}/images/Namkeens/pudina_nimki.jpg`, amount: 300 },
    { id: "All-10", name: "Mathri (black pepper)", image: `${BASE}/images/Namkeens/mathri_black_pepper.jpg`, amount: 300 },
    { id: "All-11", name: "Chakri", image: `${BASE}/images/Namkeens/chakri.jpg`, amount: 300 },
    { id: "All-12", name: "Shakar Para", image: `${BASE}/images/Namkeens/shakar_para.jpg`, amount: 300 },
    { id: "All-13", name: "Shakar Para (Wheat)", image: `${BASE}/images/Namkeens/shakar_para_wheat.jpg`, amount: 300 },
    { id: "All-14", name: "Jira Mitha Puri", image: `${BASE}/images/Namkeens/jira_mitha_puri.jpg`, amount: 300 },
    { id: "All-15", name: "Besan Ganthiya", image: `${BASE}/images/Namkeens/besan_ganthiya.jpg`, amount: 300 },
    { id: "All-16", name: "Maouli Sev", image: `${BASE}/images/Namkeens/maouli_sev.jpg`, amount: 300 },
    { id: "All-17", name: "Bhujia", image: `${BASE}/images/Namkeens/bhujia.jpg`, amount: 300 },
    { id: "All-18", name: "Chevda (Poha)", image: `${BASE}/images/Namkeens/chevda_poha.jpg`, amount: 300 },
    { id: "All-19", name: "Chevda (Corn)", image: `${BASE}/images/Namkeens/chevda_corn.jpg`, amount: 300 },
    { id: "All-20", name: "Dry Kachori", image: `${BASE}/images/Namkeens/dry_kachori.jpg`, amount: 320 },
    { id: "All-21", name: "Dry Samosa", image: `${BASE}/images/Namkeens/dry_samosa.jpg`, amount: 320 },
    { id: "All-24", name: "Katori (for Katori Chat)", image: `${BASE}/images/Namkeens/katori.jpg`, amount: 420 },
    { id: "All-25", name: "Samosa Papdi", image: `${BASE}/images/Namkeens/samosa_papdi.jpg`, amount: 300 },
    { id: "All-26", name: "Sev Puri", image: `${BASE}/images/Namkeens/sev_puri.jpg`, amount: 300 },
  ],

  Sweets: [
    { id: "Sweets-1", name: "Gulab Jamun (Gits)", image: `${BASE}/images/Sweets/gulab_jamun_gits.jpg`, amount: 300 },
    { id: "Sweets-2", name: "Khopra Pak (Nariyal Barfi)", image: `${BASE}/images/Sweets/khopra_pak_nariyal_barfi.jpg`, amount: 500 },
    { id: "Sweets-3", name: "Nariyal Laddu", image: `${BASE}/images/Sweets/nariyal_laddu.jpg`, amount: 500 },
    { id: "Sweets-4", name: "Mung Dal Halwa", image: `${BASE}/images/Sweets/mung_dal_halwa.jpg`, amount: 650 },
    { id: "Sweets-5", name: "Ghewar", image: `${BASE}/images/Sweets/ghewar.jpg`, amount: 650 },
    { id: "Sweets-6", name: "Rabdi Ghewar", image: `${BASE}/images/Sweets/rabdi_ghewar.jpg`, amount: 850 },
    { id: "Sweets-7", name: "Gund ke Laddu", image: `${BASE}/images/Sweets/gund_ke_laddu.jpg`, amount: 650 },
    { id: "Sweets-8", name: "Mohan Thal", image: `${BASE}/images/Sweets/mohan_thal.jpg`, amount: 650 },
    { id: "Sweets-9", name: "Besan Ke Laddu", image: `${BASE}/images/Sweets/besan_ke_laddu.jpg`, amount: 650 },
    { id: "Sweets-10", name: "Petha", image: `${BASE}/images/Sweets/petha.jpg`, amount: 320 },
    { id: "Sweets-11", name: "Churme ka Laddu", image: `${BASE}/images/Sweets/churme_ka_laddu.jpg`, amount: 500 },
    { id: "Sweets-12", name: "Mawa Rava Ghujiya", image: `${BASE}/images/Sweets/rava_ghujiya.jpg`, amount: 650 },
    { id: "Sweets-13", name: "Rava gujiya", image: `${BASE}/images/Sweets/mawa_rava_ghujiya .jpg`, amount: 600 },
    { id: "Sweets-14", name: "Boondi", image: `${BASE}/images/Sweets/boondi.jpg`, amount: 550 },
  ],

  Nasta_Items: [
    { id: "Nasta_Items-1", name: "Pyaaz Kachori", image: `${BASE}/images/Nasta_Items/pyaaz_kachori.jpg`, amount: 25 },
    { id: "Nasta_Items-2", name: "Vadapav", image: `${BASE}/images/Nasta_Items/vadapav.jpg`, amount: 12 },
    { id: "Nasta_Items-3", name: "Butter Vadapav", image: `${BASE}/images/Nasta_Items/butter_vadapav.jpg`, amount: 15 },
    { id: "Nasta_Items-5", name: "Chola Tikki", image: `${BASE}/images/Nasta_Items/chola_tikki.jpg`, amount: 70 },
    { id: "Nasta_Items-6", name: "Pav Bhaji", image: `${BASE}/images/Nasta_Items/pav_bhaji.jpg`, amount: 70 },
    { id: "Nasta_Items-7", name: "Samosa", image: `${BASE}/images/Nasta_Items/samosa.jpg`, amount: 15 },
    { id: "Nasta_Items-8", name: "Kachori", image: `${BASE}/images/Nasta_Items/kachori.jpg`, amount: 20 },
    { id: "Nasta_Items-9", name: "Thepla", image: `${BASE}/images/Nasta_Items/thepla.jpg`, amount: 12 },
    { id: "Nasta_Items-10", name: "Khaman", image: `${BASE}/images/Nasta_Items/khaman.jpg`, amount: 240 },
    { id: "Nasta_Items-11", name: "Sev Khamni", image: `${BASE}/images/Nasta_Items/sev_khamni.jpg`, amount: 250 },
    { id: "Nasta_Items-12", name: "Daal Baati Churma + Gatte", image: `${BASE}/images/Nasta_Items/daal_baati_churma_gatte.jpg`, amount: 250 },
    { id: "Nasta_Items-13", name: "Dahi Bade (2Pcs)", image: `${BASE}/images/Nasta_Items/dahi_bade_2pcs.jpg`, amount: 65 },
    { id: "Nasta_Items-14", name: "Kachori Chaat", image: `${BASE}/images/Nasta_Items/kachori_chaat.jpg`, amount: 60 },
    { id: "Nasta_Items-15", name: "Daal Pakwan (2Pcs)", image: `${BASE}/images/Nasta_Items/daal_pakwan_2pcs.jpg`, amount: 60 },
    { id: "Nasta_Items-16", name: "Chole Puri (7Pcs)", image: `${BASE}/images/Nasta_Items/chole_puri_7pcs.jpg`, amount: 60 },
    { id: "Nasta_Items-17", name: "Sabudana Vada (3Pcs)", image: `${BASE}/images/Nasta_Items/sabudana_vada_3pcs.jpg`, amount: 60 },
    { id: "Nasta_Items-18", name: "Dabeli", image: `${BASE}/images/Nasta_Items/dabeli.jpg`, amount: 20 },
    { id: "Nasta_Items-19", name: "Idala", image: `${BASE}/images/Nasta_Items/idala.jpg`, amount: 200 },
    { id: "Nasta_Items-20", name: "Patra", image: `${BASE}/images/Nasta_Items/patra.jpg`, amount: 250 },
    { id: "Nasta_Items-21", name: "idli sambhar", image: `${BASE}/images/Nasta_Items/idli_sambhar.jpg`, amount: 60 },

  ],

  Sabzi: [
    { id: "Sabzi-1", name: "Paneer Butter Masala", image: `${BASE}/images/Sabzi/paneer_butter_masala.jpg`, amount: 450 },
    { id: "Sabzi-2", name: "Palak Paneer", image: `${BASE}/images/Sabzi/palak_paneer.jpg`, amount: 450 },
    { id: "Sabzi-3", name: "Matar Paneer", image: `${BASE}/images/Sabzi/matar_paneer.jpg`, amount: 450 },
    { id: "Sabzi-4", name: "Kadhai Paneer", image: `${BASE}/images/Sabzi/kadhai_paneer.jpg`, amount: 450 },
    { id: "Sabzi-5", name: "Paneer Angara", image: `${BASE}/images/Sabzi/paneer_angara.jpg`, amount: 450 },
    { id: "Sabzi-6", name: "Paneer Tikka", image: `${BASE}/images/Sabzi/paneer_tikka.jpg`, amount: 450 },
    { id: "Sabzi-7", name: "Mix Veg", image: `${BASE}/images/Sabzi/mix_veg.jpg`, amount: 400 },
    { id: "Sabzi-8", name: "Step Gobi", image: `${BASE}/images/Sabzi/step_gobi.jpg`, amount: 400 },
    { id: "Sabzi-9", name: "Dam Aalo", image: `${BASE}/images/Sabzi/dam_aalo.jpg`, amount: 350 },
    { id: "Sabzi-10", name: "Malai Kofta", image: `${BASE}/images/Sabzi/malai_kofta.jpg`, amount: 450 },
    { id: "Sabzi-11", name: "Dal Makhni", image: `${BASE}/images/Sabzi/dal_makhni.jpg`, amount: 450 }
  ],

  Others: [],
};

/* ---------------------- Main Component ---------------------- */

function BillGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Namkeens");
  const [billItems, setBillItems] = useState<
    { id: string; name: string; qty: number; amount: number; isCustom?: boolean }[]
  >([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customName, setCustomName] = useState("");
  const [customQty, setCustomQty] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  const filteredItems: Item[] = items[selectedCategory].filter((item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
);
  const handleClearBill  = () => {
    setBillItems([]);
    setCustomName(""),
    setCustomPrice(""),
    setCurrentItem(null),
    setShowModal(false)
  };
  const handleGenerateBill = async () => {
    console.log("Generate Bill button clicked");
    try {
      const billElement = document.getElementById("bill-preview");
      if (!billElement) {
        console.error("Bill preview element not found");
        return;
      }

      // Wait for images to load
      const images = billElement.querySelectorAll('img');
      await Promise.all([...images].map(img => 
        img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; })
      ));

      const canvas = await html2canvas(billElement  , {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `bill-Kavita's Kitchen.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();

    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };
    function addCustomItem() {
    console.log('Add button clicked');
    console.log('customName:', customName, 'customPrice:', customPrice, 'customQty:', customQty);
    if (!customName.trim() || !customPrice) {
      console.log('Validation failed: name or price empty');
      return;
    }

    const qty = Number(customQty) || 1;
    const unitPrice = Number(customPrice);
    const total = qty * unitPrice;
    console.log('Calculated: qty:', qty, 'unitPrice:', unitPrice, 'total:', total);

    setBillItems((prev) => {
      const newItems = [
        ...prev,
        {
          id: `custom-${Date.now()}`,
          name: customName,
          qty,
          amount: total,
          isCustom: true,
        },
      ];
      console.log('New billItems:', newItems);
      return newItems;
    });

    // reset fields
    setCustomName("");
    setCustomPrice("");
    setCustomQty("");
  }
  /* ---------------------- Render ---------------------- */

  return (
    <div className="flex flex-col  h-flex-row">
      {/* HEADER */}
      <div className="h-16 bg-blue-600 text-white flex items-center px-4 shadow-md border-b mb-2 ">
        <h1 className="text-xl font-semibold">Quick Bill</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* ---------- LEFT SIDE: Categories & Items ---------- */}
        <div className="w-full bg-white p-4 border-l">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full mt-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 mb-4 pb-3 pl-10"
            />
          </div>
          {/* Categories */}
          <div className="overflow-x-auto whitespace-nowrap flex space-x-2 bg-gray-100 pb-2 ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-white shadow text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items List */}
          <div className="mt-4">
            <h2 className="font-semibold mb-2">{selectedCategory}</h2>

            {filteredItems.length === 0 ? (
              <></>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentItem(item);
                      setShowModal(true);
                    }}
                    className="bg-white rounded-xl p-2 shadow hover:shadow-lg cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <p className="text-center mt-2 font-medium">{item.name}</p>
                  </div>
                ))}
              </div>
            )}
            {selectedCategory === "Others" && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full col-span-2 border px-2 py-1 rounded mb-2"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={customQty}
                  onChange={(e) => setCustomQty(e.target.value)}
                  className="w-full border px-2 py-1 rounded mb-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full border px-2 py-1 rounded mb-2"
                />
                <button
                  onClick={addCustomItem}
                  className="w-24 bg-black text-white py-1 item-center rounded"
                >
                  Add to Bill
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 border-l border-gray-300 overflow-hidden">
          <RightSide billItems={billItems} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
            <button
              onClick={handleGenerateBill}
              className="w-full py-4 sm:py-6 text-base font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">
              Generate Bill (JPG)
            </button>
            <button
              onClick={handleClearBill}
              className="w-full py-4 sm:py-6 text-base font-semibold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors">
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* ---------- Modal ---------- */}
      {showModal && currentItem && (
        <AddItemModal
          item={currentItem}
          onClose={() => setShowModal(false)}
          onAdd={(addedItem: AddedItem) => {
            const qty =
              addedItem.qtyType === "Kg"
                ? parseFloat(addedItem.kg || "0") +
                  parseFloat(addedItem.gram || "0") / 1000
                : parseFloat(addedItem.pcs || "0");

            setBillItems((prev) => [
              ...prev,
              {
                id: addedItem.id,
                name: addedItem.name,
                qty,
                amount: addedItem.total,
              },
            ]);

            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
export default BillGenerator;
