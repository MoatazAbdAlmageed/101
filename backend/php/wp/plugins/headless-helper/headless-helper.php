<?php
/**
 * Plugin Name: Headless Helper
 * Description: Expert-level plugin providing cached REST API statistics.
 * Version: 1.0
 * Author: WordPress Mastery Mentor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the custom REST API route.
 */
function headless_helper_register_routes() {
	register_rest_route( 'headless-helper/v1', '/stats', array(
		'methods'  => 'GET',
		'callback' => 'headless_helper_get_stats',
		'permission_callback' => '__return_true', // Publicly accessible
	) );
}
add_action( 'rest_api_init', 'headless_helper_register_routes' );

/**
 * Callback function to return site statistics.
 * Uses Transients API for 1-hour caching.
 */
function headless_helper_get_stats() {
	// Try to get data from cache first
	$stats = get_transient( 'headless_helper_site_stats' );

	if ( false === $stats ) {
		// Cache missed! Recalculate counts
		$stats = array(
			'posts'      => wp_count_posts( 'post' )->publish,
			'pages'      => wp_count_posts( 'page' )->publish,
			'portfolios' => wp_count_posts( 'portfolio' )->publish,
			'timestamp'  => current_time( 'mysql' ),
			'source'     => 'database',
		);

		// Store in cache for 1 hour (3600 seconds)
		set_transient( 'headless_helper_site_stats', $stats, HOUR_IN_SECONDS );
	} else {
		$stats['source'] = 'cache';
	}

	return rest_ensure_response( $stats );
}

/**
 * Clear cache when content is updated.
 */
function headless_helper_clear_cache() {
	delete_transient( 'headless_helper_site_stats' );
}
add_action( 'save_post', 'headless_helper_clear_cache' );
