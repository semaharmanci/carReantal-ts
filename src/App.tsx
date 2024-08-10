import { useSearchParams } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import { useEffect, useState } from "react";
import fetchCars from "./utils/fetchCars";
import { CarType } from "./types";
import Warning from "./components/Warning";
import Card from "./components/Card";
import LoadMore from "./components/LoadMore";
import { fuels } from "./utils/contants";
import { years } from "./utils/contants";

function App() {
  const [params] = useSearchParams();
  const [cars, setCars] = useState<CarType[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    const paramsObj = Object.fromEntries(params.entries());
    fetchCars({ limit, ...paramsObj })
      .then((data) => setCars(data))
      .catch(() => setIsError(true));
  }, [limit, params]);

  return (
    <div className="min-h-screen text-white bg-[rgb(23,23,23)]">
      <Header />
      <Hero />
      <div className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Araba Katalogu</h1>
          <p>Begenebilecegin arabalari kesfet.</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <Filter options={fuels} name="fuel_type" />
            <Filter options={years} name="year" />
          </div>
        </div>

        {/* arac listeleme */}
        {!cars ? (
          <Warning>Yükleniyor..</Warning>
        ) : isError ? (
          <Warning>Üzgünüz, bir sorun olustu.</Warning>
        ) : cars.length < 1 ? (
          <Warning>Aradiginiz kriterlere uygun araba bulunmadi.</Warning>
        ) : (
          cars.length > 1 && (
            <section>
              <div className="home__cars-wrapper">
                {cars.map((car, i) => (
                  <Card car={car} key={i} />
                ))}
                <LoadMore
                  limit={limit}
                  handleClick={() => {
                    setLimit(limit + 5);
                  }}
                />
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}

export default App;
