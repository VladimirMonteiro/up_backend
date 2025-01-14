const Product = require('../models/Product')

module.exports = class ProductController {

    static async create(req,res) {

        const {name,description, security_information, operational_information, technical_information, category} = req.body
       

        const createdProduct = new Product({
            image: req.file.filename,
            name,
            description,
            security_information,
            operational_information,
            technical_information,
            category


        })

        try { 
       
    

        await createdProduct.save()

        res.status(201).json({message: "produto cadastrado com sucesso."})

        }catch(err){
            console.log(err)
            res.status(401).json({message: "Ocorreu um erro, tente mais tarde."})
        }  
       

    }

    static async showProducts(req, res) {
        try {
            // Obtém a página e o número de itens por página a partir dos parâmetros da requisição
            const page = parseInt(req.query.page) || 1;  // Página atual (default: 1)
            const limit = parseInt(req.query.limit) || 10;  // Número de itens por página (default: 10)
            
            // Calcula o índice do primeiro item para a página atual
            const skip = (page - 1) * limit;
    
            // Obtém os produtos com a paginação
            const products = await Product.find()
                .skip(skip)  // Pula os itens já exibidos nas páginas anteriores
                .limit(limit);  // Limita o número de itens por página
    
            // Conta o total de produtos para calcular o número total de páginas
            const totalProducts = await Product.countDocuments();
    
            // Envia a resposta com os produtos e informações de paginação
            res.status(200).json({
                products,
                pagination: {
                    totalProducts,
                    totalPages: Math.ceil(totalProducts / limit),
                    currentPage: page,
                    itemsPerPage: limit
                }
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Houve um problema, tente mais tarde!' });
        }

        console.log("chegou aki")
    }
    

    static async getProductById(req,res){

        const {id} = req.params


        try {
            const product = await Product.findById(id)
            res.status(200).json(product)
            
        } catch (error) {
            console.log(error)
            res.status(422).json({message: error})
            
        }
    }

    static async searchProduct(req, res) {

        console.log("test")
        try {
            // Recebe os parâmetros da query string
            const { query, page = 1, limit = 10 } = req.query;
    
            // Validação do termo de pesquisa
            if (!query || query.trim() === "") {
                return res.status(400).json({ message: 'Por favor, forneça um termo de pesquisa válido.' });
            }
    
            // Validação da página e limite
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
    
            if (isNaN(pageNumber) || pageNumber <= 0) {
                return res.status(400).json({ message: 'Número da página inválido.' });
            }
    
            if (isNaN(limitNumber) || limitNumber <= 0) {
                return res.status(400).json({ message: 'Número de itens por página inválido.' });
            }
    
            // Cálculo do valor de skip baseado na página e no limite
            const skip = (pageNumber - 1) * limitNumber;
    
            // Realiza a busca com o termo fornecido
            const products = await Product.find({
                name: { $regex: query, $options: 'i' } // A pesquisa será feita de forma insensível ao caso
            })
            .skip(skip)
            .limit(limitNumber);
    
            // Se não houver produtos encontrados
            if (products.length === 0) {
                return res.status(404).json({ message: 'Nenhum produto encontrado.' });
            }
    
            // Contagem do número total de produtos para paginar corretamente
            const totalProducts = await Product.countDocuments({
                name: { $regex: query, $options: 'i' }
            });
    
            // Cálculo das páginas totais
            const totalPages = Math.ceil(totalProducts / limitNumber);
    
            // Retorno dos resultados e informações de paginação
            return res.status(200).json({
                products,
                pagination: {
                    totalProducts,
                    totalPages,
                    currentPage: pageNumber,
                    limit: limitNumber
                }
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Houve um erro ao buscar os produtos, tente novamente mais tarde.' });
        }
    }
    
    
}