import { defineStore } from 'pinia';


const local_url = 'http://192.168.1.34:3001'

interface FetchPhonebookParams {
  keyword: string;
  sort: string;
  page: number;
}

interface AddPhonebookParams {
  name: string;
  phone: string;
  keyword: string;
  sort: string
}

interface RemovePhonebookParams {
  id: string;
  keyword: string;
  sort: string
}

interface UpdatePhonebookParams {
  id: string;
  name: string;
  phone: string;
}

interface HandleFileUploadParams {
  file: string;
  id: string;
  keyword: string;
  sort: string
}

interface Phonebook {
  id: string;
  name: string;
  phone: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

interface PhonebookState {
  phonebooks: Phonebook[];
  page: number;
  totalPage: number;
  keyword: string;
  sort: string;
  loading: boolean;
  error: string | null;
}

export const usePhonebookStore = defineStore('phonebook', {
  state: (): PhonebookState => ({
    phonebooks: [],
    page: 1,
    totalPage: 1,
    keyword: '',
    sort: 'asc',
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPhonebookData({ keyword, sort, page }: FetchPhonebookParams) {
      this.loading = true;
      const query = keyword;
      const limit = 10;
      try {
        const response = await fetch(`${local_url}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query FetchPhonebooks($query: String, $page: Int, $limit: Int, $sort: String) {
                fetchPhonebooks(query: $query, page: $page, limit: $limit, sort: $sort) {
                  phonebooks {
                    id
                    name
                    phone
                  }
                  page
                  limit
                  pages
                  total
                }
              }
            `,
            variables: { query, page, limit, sort },
          }),
        });

        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);
        const data = result.data.fetchPhonebooks

        this.setSort(sort);
        this.setKeyword(keyword);
        this.setTotalPage(data.pages);
        this.phonebooks = [...this.phonebooks, ...data.phonebooks];
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message; // Access the 'message' property safely
        } else {
          this.error = 'An unknown error occurred'; // Fallback for unknown error types
        }
      } finally {
        this.loading = false;
      }
    },

    async refreshPhonebookData({ keyword, sort, page }: FetchPhonebookParams) {
      console.log(keyword, sort, page)
      this.loading = true;
      const query = keyword;
      const limit = 10;
      try {
        const response = await fetch(`${local_url}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query FetchPhonebooks($query: String, $page: Int, $limit: Int, $sort: String) {
                fetchPhonebooks(query: $query, page: $page, limit: $limit, sort: $sort) {
                  phonebooks {
                    id
                    name
                    phone
                  }
                  page
                  limit
                  pages
                  total
                }
              }
            `,
            variables: { query, page, limit, sort },
          }),
        });

        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);
        const data = result.data.fetchPhonebooks

        console.log(data)

        this.setPage(1);
        this.setSort(sort);
        this.setTotalPage(data.pages);
        console.log('update total page')
        this.phonebooks = data.phonebooks;
        console.log('update phonebooks')
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message; // Access the 'message' property safely
        } else {
          this.error = 'An unknown error occurred'; // Fallback for unknown error types
        }
      } finally {
        this.loading = false;
      }
    },

    async addPhonebook({ name, phone, keyword, sort }: AddPhonebookParams) {
      try {
        const response = await fetch(`${local_url}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation AddPhonebook($name: String!, $phone: String!) {
                addPhonebook(name: $name, phone: $phone) {
                  id
                  name
                  phone
                }
              }
            `,
            variables: { name, phone },
          }),
        });
    
        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);
        await this.refreshPhonebookData({ keyword, sort, page: 1 });
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message; // Access the 'message' property safely
        } else {
          this.error = 'An unknown error occurred'; // Fallback for unknown error types
        }
      }
    },

    async removePhonebook({ id, keyword, sort }: RemovePhonebookParams) {
      try {
        const response = await fetch(`${local_url}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation DeletePhonebook($id: ID!) {
                deletePhonebook(id: $id) {
                  id
                  name
                  phone
                }
              }
            `,
            variables: { id },
          }),
        });
    
        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);
        await this.refreshPhonebookData({ keyword, sort, page: 1 });
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message; // Access the 'message' property safely
        } else {
          this.error = 'An unknown error occurred'; // Fallback for unknown error types
        }
      }
    },

    async updatePhonebook({ id, name, phone }: UpdatePhonebookParams) {
      try {
        const response = await fetch(`${local_url}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation UpdatePhonebook($id: ID!, $name: String, $phone: String) {
                updatePhonebook(id: $id, name: $name, phone: $phone) {
                  id
                  name
                  phone
                }
              }
            `,
            variables: { id, name, phone },
          }),
        });
    
        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message; // Access the 'message' property safely
        } else {
          this.error = 'An unknown error occurred'; // Fallback for unknown error types
        }
      }
    },

    async handleFileUpload({ file, id, keyword, sort }: HandleFileUploadParams) {
      try {
        if (!file) throw new Error('Please select a file first');

        

        const formData = new FormData();
        formData.append('avatar', file);

        const response = await fetch(`${local_url}/graphql/avatar/${id}`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to upload file');
        await response.json();
        await this.refreshPhonebookData({ keyword, sort, page: 1 });
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message; // Access the 'message' property safely
        } else {
          this.error = 'An unknown error occurred'; // Fallback for unknown error types
        }
      }
    },

    // Utility methods for state updates
    setPage(page: number) {
      this.page = page;
    },
    setSort(sort: string) {
      this.sort = sort;
    },
    setKeyword(keyword: string) {
      this.keyword = keyword;
    },
    setTotalPage(totalPage: number) {
      this.totalPage = totalPage;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    clearPhonebook() {
      this.phonebooks = [];
    },
  },
});
