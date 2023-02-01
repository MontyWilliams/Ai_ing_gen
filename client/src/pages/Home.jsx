import React, {useState, useEffect } from 'react'
import { Loader, Card, FormField, RenderCards } from '../components';



//Conditional Rendring is used along with props passed in to make the page render dynamically
function Home() {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts ] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);
  
        const fetchPosts = async () => {
            setLoading(true);
        
            try {
              const response = await fetch('http://localhost:8080/api/v1/post', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        
              if (response.ok) {
                const result = await response.json();
                setAllPosts(result.data.reverse());
              }
            } catch (err) {
              alert(err);
            } finally {
              setLoading(false);
            }
          };
        
          useEffect(() => {
            fetchPosts();
          }, []);

          const handleSearchChange = (e) => {
            clearTimeout(searchTimeout)
            setSearchText(e.target.value);
            setSearchTimeout(
            setTimeout(() => {
              const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()) )
              setSearchResults(searchResults)
            }, 500)
              )
            }
            console.log(searchResults)
  return (
    <div>
        <section className="max-w-7xl mx-auto bg-gradient-to-r from-white to-transparent rounded-lg p-8">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px] font-Bungee">The Community ShowCase</h1>
                <p className="mt-2 font-fredricka text-[14px] max-w-[500px]">Browse through a collection of imaginative and visually stunnig images generated by DALL-E AI</p>
            </div>
            <div className="mt-16">
                <FormField 
                  labelName="Search Posts"
                  type="text"
                  name="text"
                  placeholder="Search posts"
                  value={searchText}
                  handleChange={handleSearchChange}
                />
            </div>
            <div className="mt-10">     
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader/>
                    </div>
                ) : (
                    <>
                    {searchText && (
                        <h2 className="font-medium text-xl  text-[#050505] mb-3">
                            Showing Results for <span className="text-black">{searchText}</span>
                        </h2>
                    )}
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        {searchText ? (
                            <RenderCards data={searchResults} title="No search results found" />
                        ) : (
                            <RenderCards data={allPosts} title="No posts found" />
                        )}
                    </div>
                    </>
                )}
            </div>
        </section>
    </div>
  )
}

export default Home
