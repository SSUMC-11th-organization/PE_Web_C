package com.umc.study.service;

import com.umc.study.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Map<String, Object>> getAllBooks() {
        return bookRepository.findAll();
    }
    // BookService.java에 추가
    public void createBook(Map<String, Object> body){
        bookRepository.save(body);
    }
    public List<Map<String, Object>> getBooksByCategoryId(int categoryId) {
        return bookRepository.findByCategoryId(categoryId);
    }
}