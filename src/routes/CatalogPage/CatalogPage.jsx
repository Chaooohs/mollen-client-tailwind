import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useGetDataQuery } from "../../redux/goodsAPI";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";

import filters from '/public/images/svg/filters.svg'
import { Aside, Breadcrumbs, Cards, LastSeen, SubCategoriesBtn, PaginationNav, SortBy } from "../../components";
import { setFilters, setSidebarOpen } from "../../redux";
import { categoryUkr } from "../../utils";
import styles from "./CatalogPage.module.scss";

export const CatalogPage = () => {
  const isLaptop = useMediaQuery({ maxWidth: 992 })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstRequest = useRef(false);
  const [skip, setSkip] = useState(true);

  let { category, subcategory, page, color, size, sortby, order } = useSelector((state) => state.filters);

  const { data: products, error } = useGetDataQuery(
    {
      category,
      subcategory,
      page,
      color,
      size,
      sortby,
      order,
    },
    {
      skip: skip, // запрос по условию. если параметр skip: true, запрос не происходит.
    }
  );

  // чтение из адреcной строки.
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      firstRequest.current = true; // подтверждение выполнения диспатча
    }
    // firstRequest.current = true
  }, []);

  // запись в адресную строку.
  useEffect(() => {

    const queryString = qs.stringify({
      category,
      subcategory: subcategory === "" ? null : subcategory,
      page,
      color: color === "" ? null : color,
      size: size === "" ? null : size,
      sortby: sortby === "" ? null : sortby,
      order,
    }, { skipNulls: true });  // skipNulls полностью пропускает рендеринг ключей со null значениями

    navigate(`?${queryString}`);

  }, [category, subcategory, page, color, size, sortby, order]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (firstRequest.current) {
      // устранение второго запроса. ожидание выполнения диспатча.
      setSkip(false);
    }
  }, [page]);

  const handleOpenFilter = () => {
    dispatch(setSidebarOpen(true))
    document.body.classList.add('no-scroll')
  }

  return (
    <main className="main grid-lt">

      {
        !isLaptop &&
        <Aside />
      }

      <section className={styles.section}>

        <header className={styles.header}>
          <Breadcrumbs current={categoryUkr(category)} />
          <h1 className="heading">{categoryUkr(category)}</h1>
        </header>

        {
          isLaptop &&
          <div className={styles.filters} style={{ borderTop: '1px solid #ECEAE7' }}>
            <button className={styles.filters__button }onClick={handleOpenFilter}>
              <img className={styles.filters__icon} src={filters} alt="filters" />
              <span className={styles.filters__text}>фільтри</span>
            </button>
          </div>
        }

        <SubCategoriesBtn category={category} />
        <SortBy />

        <div style={{ flex: "1" }}>
          {!error ? (
            <>
              <div className="cards-lt">
                {
                  products?.map((el) => {
                    return (
                      <Link
                        key={el.id}
                        to={`/${el.id}`}
                        state={{ subfolder: category }}
                      >
                        <Cards
                          el={el}
                        />
                      </Link>
                    )
                  })
                }
              </div>
              <PaginationNav />
            </>
          ) : (
            <h1 className="txt-xl" style={{ marginLeft: "52px" }}>
              товар не знайдено
            </h1>
          )}
        </div>

        <LastSeen category={category} />
      </section>
    </main>
  );
};
